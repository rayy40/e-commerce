const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");
const { Cart } = require("../models/cart");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

const convertUSDToINR = (amount) => {
  const exchangeRate = 83.42; // current exchange rate as of March 25th, 2024
  const convertedAmount = amount * exchangeRate;
  return convertedAmount;
};

router.post("/create-checkout-session", async (req, res) => {
  const cartItems = req.body.cartItems.map((item) => ({
    name: item.title,
    productId: item.id,
    color: item.colorway,
    quantity: item.quantity,
    images: item.media.imageUrl,
    retailPrice: Math.round(convertUSDToINR(item?.retailPrice) * 100),
  }));

  const cart = new Cart({
    userId: req.body.userId,
    cartItems,
  });

  await cart.save();

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cartId: cart._id.toString(),
    },
  });

  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item?.title,
          images: [item?.media?.imageUrl],
          description: item?.brand,
          metadata: {
            id: item?.id,
          },
        },
        unit_amount: Math.round(convertUSDToINR(item?.retailPrice) * 100),
      },
      quantity: item?.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 35000,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: "payment",
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });
  res.send({ url: session.url });
});

const createOrder = async (customer, data) => {
  const cartId = customer.metadata.cartId;
  const cart = await Cart.findById(cartId);

  const cartItems = cart.cartItems;

  const products = cartItems.map((item) => {
    return {
      name: item.name,
      images: item.images,
      color: item.color,
      productId: item.productId,
      quantity: item.quantity,
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  });

  try {
    await newOrder.save();
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event = req.body;

    if (endpointSecret) {
      const signature = req.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
        console.log("Webhook verified.");
      } catch (err) {
        console.log(`Webhook not verified: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

    const data = event.data.object;

    switch (event.type) {
      case "checkout.session.completed":
        stripe.customers
          .retrieve(data.customer)
          .then((customer) => {
            createOrder(customer, data);
          })
          .catch((err) => console.log(err.message));

        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }

    res.send().end();
  }
);

module.exports = router;
