const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const addTransactionButton = document.getElementById("add-transaction");
const balanceSpan = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

let balance = 0;
const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  if (description !== "" && !isNaN(amount) && amount !== 0) {
    const transaction = { description, amount };
    transactions.push(transaction);
    updateBalance(transaction.amount);
    updateTransactionList(transaction);
    saveTransactions();
    descriptionInput.value = "";
    amountInput.value = "";
  }
}

function updateBalance(amount) {
  balance += amount;
  balanceSpan.textContent = balance.toFixed(2);
}

function updateTransactionList(transaction) {
  const listItem = document.createElement("li");
  listItem.textContent = `${
    transaction.description
  } - $${transaction.amount.toFixed(2)}`;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = () => {
    transactions.splice(transactions.indexOf(transaction), 1);
    updateBalance(-transaction.amount);
    saveTransactions();
    listItem.remove();
  };
  listItem.appendChild(deleteButton);
  transactionList.appendChild(listItem);
}

function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
  transactions.forEach((transaction) => updateTransactionList(transaction));
}

addTransactionButton.onclick = addTransaction;
window.onload = loadTransactions;
