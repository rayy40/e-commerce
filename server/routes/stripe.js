const express = require("express");
const Stripe = require("stripe");
const { Order } = require("../models/order");
const { Cart } = require("../models/cart");

require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

const convertUSDToINR = (amount) => {
  const exchangeRate = 74.51; // current exchange rate as of April 14th, 2023
  const convertedAmount = amount * exchangeRate;
  const formattedAmount = convertedAmount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const amountWithoutComma = formattedAmount.replace(/,/g, "");
  return 240;
};

router.post("/create-checkout-session", async (req, res) => {
  const cartItems = req.body.cartItems.map((item) => ({
    name: item.title,
    productId: item.id,
    color: item.colorway,
    quantity: item.quantity,
    images: item.media.imageUrl,
    retailPrice: convertUSDToINR(item.retailPrice),
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
        unit_amount: convertUSDToINR(item?.retailPrice) * 100,
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

// Create order function

const createOrder = async (customer, data) => {
  const cartId = customer.metadata.cartId;
  const cart = await Cart.findById(cartId);

  const cartItems = cart.cartItems;

  console.log(cartItems);

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
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
    // Update user's order history
    // const user = await User.findById(customer.metadata.userId);
    // if (!user) {
    //   throw new Error("User not found");
    // }

    // user.orderHistory.push(savedOrder._id);
    // await user.save();

    // console.log("User's order history updated");
  } catch (err) {
    console.log(err);
  }
};

//Stripe webhook

// endpointSecret =
//   "whsec_3f3d4384b4ea1a5b8f9217da901ccb0ac9425325b1e6c04cfbdf503b01903aec";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    let data;
    let eventType;

    let webhookSecret = "";
    // "whsec_3f3d4384b4ea1a5b8f9217da901ccb0ac9425325b1e6c04cfbdf503b01903aec"; // Set this to your Stripe webhook secret key

    if (webhookSecret) {
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        console.log("Webhook Verified");
      } catch (err) {
        console.log("Webhook Error");
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE ORDER
            const order = await createOrder(customer, data); // Call your createOrder function and pass in the customer and data objects
            console.log(`Created order ${order._id}`);
          } catch (err) {
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 res to acknowledge receipt of the event
    res.status(200).send("Webhook received").end();
  }
);

module.exports = router;
