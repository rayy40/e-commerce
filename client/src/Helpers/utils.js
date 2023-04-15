export const convertUSDToINR = (amount) => {
  const exchangeRate = 74.51; // current exchange rate as of April 14th, 2023
  const convertedAmount = amount * exchangeRate;
  const formattedAmount = convertedAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
};
