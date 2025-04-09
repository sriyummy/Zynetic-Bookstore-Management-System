const token = localStorage.getItem("token");
const tableBody = document.getElementById("bookTableBody");
const errorDiv = document.getElementById("error");


if (!token) {
  window.location.href = "index.html";
}

const loadBooks = async () => {
    console.log("🟡 loadBooks() called");
    const token = localStorage.getItem("token");
  
    const category = document.getElementById("filterCategory").value;
    const sort = document.getElementById("sortBy").value;
  
    let url = "http://localhost:3000/books?";
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (sort) url += `sort=${encodeURIComponent(sort)}&`;
  
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
  
      const data = await res.json();
      console.log("📚 Book fetch response:", data);
  
      const books = data.data || data;
  
      tableBody.innerHTML = "";
  
      books.forEach((book) => {
        const row = `<tr>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.category}</td>
          <td>₹${book.price}</td>
          <td>${book.rating}</td>
          <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-2" onclick="openEditModal('${book._id}')">Edit</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteBook('${book._id}')">Delete</button>
          </td>
        </tr>`;
        tableBody.innerHTML += row;
      });
    } catch (err) {
      console.error("❌ Error fetching books:", err);
    }
  };  
  

document.getElementById("editBookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const id = document.getElementById("editId").value;
    const updatedBook = {
      title: document.getElementById("editTitle").value,
      author: document.getElementById("editAuthor").value,
      category: document.getElementById("editCategory").value,
      price: parseFloat(document.getElementById("editPrice").value),
      rating: parseFloat(document.getElementById("editRating").value),
      publishedDate: document.getElementById("editPublishedDate").value,
    };
  
    const res = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(updatedBook),
    });
  
    if (res.ok) {
      editModal.hide();
      loadBooks();  
    } else {
      alert("Update failed.");
    }
  });  

  let editModal;
  document.addEventListener("DOMContentLoaded", () => {
    const modalEl = document.getElementById("editModal");
    if (modalEl) {
      editModal = new bootstrap.Modal(modalEl);
    }
  });

async function deleteBook(id) {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;
  
    const res = await fetch(`http://localhost:3000/books/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  
    if (res.ok) {
      loadBooks();
    } else {
      alert("Failed to delete book.");
    }
  }

  async function openEditModal(id) {
    const res = await fetch(`http://localhost:3000/books/${id}`);
    const book = await res.json();
  
    document.getElementById("editId").value = book._id;
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editCategory").value = book.category;
    document.getElementById("editPrice").value = book.price;
    document.getElementById("editRating").value = book.rating;
    document.getElementById("editPublishedDate").value = book.publishedDate.split("T")[0];
  
    editModal.show();
  }  

document.getElementById("addBookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  errorDiv.style.display = "none";

  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    price: parseFloat(document.getElementById("price").value),
    rating: parseFloat(document.getElementById("rating").value),
    publishedDate: document.getElementById("publishedDate").value,
  };

  const res = await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(newBook),
  });

  if (res.ok) {
    loadBooks();
    e.target.reset();
  } else {
    const error = await res.json();
    errorDiv.style.display = "block";
    errorDiv.textContent = error.message || "Error!";
  }
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

document.getElementById("filterCategory").addEventListener("change", loadBooks);
document.getElementById("sortBy").addEventListener("change", loadBooks);

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "index.html";
  });

loadBooks();
