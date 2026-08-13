import { transactions } from "./transactions.js";

import { totalByType, formatReceipts, updateTransaction } from "./report.js";

const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

const receipts = formatReceipts(transactions);

const correctedTransaction = updateTransaction(transactions[0], 300);

console.log("=== TeleBirr Transaction Report ===");

console.log("Credits:", totalCredits, "ETB");
console.log("Debits:", totalDebits, "ETB");

console.log("\nReceipts:");

for (const receipt of receipts) {
  console.log(receipt);
}

console.log("\nOriginal transaction:");
console.log(transactions[0]);

console.log("\nCorrected transaction:");
console.log(correctedTransaction);
