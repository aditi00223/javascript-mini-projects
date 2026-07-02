// The account object holds all our state - balance and transaction history
let account = {
  balance: 0,
  transactions: []
};

const balanceDisplay = document.getElementById("balance");
const amountInput = document.getElementById("amountInput");
const message = document.getElementById("message");
const historyList = document.getElementById("historyList");

// DEPOSIT function
function deposit() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    showMessage("Please enter a valid amount");
    return;
  }

  account.balance += amount;
  addTransaction("Deposit", amount);
  updateUI();
}

// WITHDRAW function
function withdraw() {
  const amount = Number(amountInput.value);

  if (!amount || amount <= 0) {
    showMessage("Please enter a valid amount");
    return;
  }

  if (amount > account.balance) {
    showMessage("Insufficient balance!");
    return;
  }

  account.balance -= amount;
  addTransaction("Withdraw", amount);
  updateUI();
}

// Add a new transaction to the account object's transactions array
function addTransaction(type, amount) {
  const transaction = {
    type: type,
    amount: amount,
    date: new Date().toLocaleTimeString()
  };

  account.transactions.push(transaction);
}

// Update the balance display and re-render the transaction history
function updateUI() {
  balanceDisplay.textContent = account.balance;
  amountInput.value = "";
  message.textContent = "";

  renderHistory();
}

// Rebuild the transaction history list from the account object
function renderHistory() {
  historyList.innerHTML = "";

  // Show most recent transactions first
  const recentFirst = [...account.transactions].reverse();

  recentFirst.forEach(txn => {
    const li = document.createElement("li");
    li.classList.add(txn.type === "Deposit" ? "deposit-entry" : "withdraw-entry");

    const sign = txn.type === "Deposit" ? "+" : "-";
    li.innerHTML = `<span>${txn.type} (${txn.date})</span><span>${sign}₹${txn.amount}</span>`;

    historyList.appendChild(li);
  });
}

function showMessage(text) {
  message.textContent = text;
}