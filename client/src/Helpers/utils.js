export const convertUSDToINR = (amount) => {
  const exchangeRate = 82.84; // current exchange rate as of August 4th, 2023
  const convertedAmount = amount * exchangeRate;
  const formattedAmount = convertedAmount.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
};
