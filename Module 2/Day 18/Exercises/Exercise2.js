const customer = {
  name: "Almaz",
  city: "Addis Ababa",
  balance: 2500,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(key + ":", value);
}
