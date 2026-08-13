export const totalByType = (txns, type) => {
  return txns
    .filter(function (transaction) {
      return transaction.type === type;
    })
    .reduce(function (sum, transaction) {
      return sum + transaction.amount;
    }, 0);
};

export function formatReceipts(txns) {
  return txns.map(function ({ customer, amount }) {
    return `${customer}: ${amount.toFixed(2)} ETB`;
  });
}

export function updateTransaction(transaction, newAmount) {
  return {
    ...transaction,
    amount: newAmount,
  };
}
