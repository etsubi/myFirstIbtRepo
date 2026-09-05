const customer = {
  name: "Almaz",
  city: "Addis Ababa",
  balance: 2500,
};

const { name, city } = customer;

console.log(name);
console.log(city);

function greet({ name }) {
  console.log("Hello, " + name + "!");
}

greet(customer);
