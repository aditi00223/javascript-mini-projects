// Array of book objects - our library "database"
let books = [];
let nextId = 1;

const titleInput = document.getElementById("titleInput");
const authorInput = document.getElementById("authorInput");
const searchInput = document.getElementById("searchInput");
const bookTableBody = document.getElementById("bookTableBody");
const emptyMsg = document.getElementById("emptyMsg");

// CREATE - add a new book
function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (title === "" || author === "") {
    alert("Please enter both title and author");
    return;
  }

  books.push({
    id: nextId++,
    title: title,
    author: author,
    status: "Available",
    borrower: ""
  });

  titleInput.value = "";
  authorInput.value = "";
  renderBooks();
}

// UPDATE - mark a book as issued
function issueBook(id) {
  const borrowerName = prompt("Enter borrower's name:");

  if (!borrowerName || borrowerName.trim() === "") {
    return;
  }

  const book = books.find(b => b.id === id);
  book.status = "Issued";
  book.borrower = borrowerName.trim();

  renderBooks();
}

// UPDATE - mark a book as returned
function returnBook(id) {
  const book = books.find(b => b.id === id);
  book.status = "Available";
  book.borrower = "";

  renderBooks();
}

// DELETE - remove a book entirely
function deleteBook(id) {
  const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

  books = books.filter(b => b.id !== id);
  renderBooks();
}

// READ - render the table, applying search filter
function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm)
  );

  bookTableBody.innerHTML = "";

  if (filteredBooks.length === 0) {
    emptyMsg.classList.remove("hidden");
    return;
  }

  emptyMsg.classList.add("hidden");

  filteredBooks.forEach(book => {
    const row = document.createElement("tr");

    const statusClass = book.status === "Available" ? "status-available" : "status-issued";

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td class="${statusClass}">${book.status}</td>
      <td>${book.borrower || "-"}</td>
      <td>
        <div class="action-btns">
          ${book.status === "Available"
            ? `<button class="issue-btn" onclick="issueBook(${book.id})">Issue</button>`
            : `<button class="return-btn" onclick="returnBook(${book.id})">Return</button>`
          }
          <button class="delete-btn" onclick="deleteBook(${book.id})">Delete</button>
        </div>
      </td>
    `;

    bookTableBody.appendChild(row);
  });
}

// Initialize with a few sample books so the table isn't empty on load
window.onload = function() {
  books.push(
    { id: nextId++, title: "The Alchemist", author: "Paulo Coelho", status: "Available", borrower: "" },
    { id: nextId++, title: "Atomic Habits", author: "James Clear", status: "Issued", borrower: "Riya" },
    { id: nextId++, title: "1984", author: "George Orwell", status: "Available", borrower: "" }
  );

  renderBooks();
};