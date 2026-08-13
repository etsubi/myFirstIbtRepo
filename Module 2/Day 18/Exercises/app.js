import { addVat, VAT } from "./money.js";
const price = 1000;
console.log("VAT rate:", VAT);
console.log("Price with VAT:", addVat(price), "ETB");
