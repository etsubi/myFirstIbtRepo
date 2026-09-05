const customer = {
  name: "Almaz",
  city: "Addis Ababa",
  balance: 2500,
};

const updatedCustomer = {
  ...customer,
  city: "Dire Dawa",
  phone: "0911223344",
};

console.log("Original customer:");
console.log(customer);

console.log("Updated customer:");
console.log(updatedCustomer);
