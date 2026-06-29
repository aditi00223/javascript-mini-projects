// Shop Now Button
const shopButton = document.querySelector(".hero-text button");

shopButton.addEventListener("click", () => {
    alert("Welcome to the Amazon Homepage Clone!");
});

// Search Button
const searchButton = document.querySelector(".nav-search button");

searchButton.addEventListener("click", () => {
    const searchInput = document.querySelector(".nav-search input").value;

    if (searchInput.trim() === "") {
        alert("Please enter something to search.");
    } else {
        alert(`Searching for: ${searchInput}`);
    }
});