const prices = [500, 800, 1200, 300, 950];

const withVAT = prices.map(function (price) {
  return price * 1.15;
});

const under1000 = withVAT.filter(function (price) {
  return price < 1000;
});

const grandTotal = under1000.reduce(function (sum, price) {
  return sum + price;
}, 0);

console.log("Prices with VAT:", withVAT);
console.log("Under 1000:", under1000);
console.log("Grand Total:", grandTotal, "ETB");
