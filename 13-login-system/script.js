// Check if a user is already logged in when page loads
window.onload = function() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    showWelcome(loggedInUser);
  }
};

// REGISTER a new user
function registerUser() {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const message = document.getElementById("message");

  if (username === "" || password === "") {
    message.textContent = "Please fill all fields";
    return;
  }

  // Get existing users (or empty object if none)
  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (users[username]) {
    message.textContent = "Username already exists!";
    return;
  }

  // Save new user
  users[username] = password;
  localStorage.setItem("users", JSON.stringify(users));

  message.style.color = "green";
  message.textContent = "Registered successfully! Please login.";

  // Clear fields and switch to login form
  document.getElementById("regUsername").value = "";
  document.getElementById("regPassword").value = "";
  showLogin();
}

// LOGIN existing user
function loginUser() {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const message = document.getElementById("message");

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    message.style.color = "red";
    message.textContent = "User not found. Please register.";
    return;
  }

  if (users[username] !== password) {
    message.style.color = "red";
    message.textContent = "Incorrect password!";
    return;
  }

  // Success - save session
  localStorage.setItem("loggedInUser", username);
  message.textContent = "";
  showWelcome(username);
}

// LOGOUT
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";
  showLogin();
}

// --- UI Switching functions ---
function showLogin() {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("welcomeBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("message").textContent = "";
}

function showRegister() {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("welcomeBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
  document.getElementById("message").textContent = "";
}

function showWelcome(username) {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("welcomeBox").classList.remove("hidden");
  document.getElementById("welcomeUser").textContent = username;
}