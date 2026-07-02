const usernameInput = document.getElementById("usernameInput");
const errorMsg = document.getElementById("errorMsg");
const profileCard = document.getElementById("profileCard");

async function searchUser() {
  const username = usernameInput.value.trim();

  if (username === "") {
    return;
  }

  // Hide previous results/errors while we fetch new data
  errorMsg.classList.add("hidden");
  profileCard.classList.add("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      // 404 or any other error status
      throw new Error("User not found");
    }

    const data = await response.json();
    displayUser(data);

  } catch (error) {
    errorMsg.classList.remove("hidden");
  }
}

function displayUser(data) {
  document.getElementById("avatar").src = data.avatar_url;
  document.getElementById("name").textContent = data.name || data.login;
  document.getElementById("username").textContent = "@" + data.login;
  document.getElementById("bio").textContent = data.bio || "No bio available";

  document.getElementById("repos").textContent = data.public_repos;
  document.getElementById("followers").textContent = data.followers;
  document.getElementById("following").textContent = data.following;

  document.getElementById("location").textContent = "📍 " + (data.location || "Not specified");

  const joinedDate = new Date(data.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long"
  });
  document.getElementById("joined").textContent = "📅 Joined " + joinedDate;

  document.getElementById("profileLink").href = data.html_url;

  profileCard.classList.remove("hidden");
}

// Allow pressing Enter in the input to trigger search
usernameInput.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    searchUser();
  }
});