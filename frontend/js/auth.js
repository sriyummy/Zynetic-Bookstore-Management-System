console.log("✅ auth.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorDiv = document.getElementById("error");

  if (!form) {
    console.log("❌ Form not found");
    return;
  }

  console.log("✅ Form found. Attaching submit handler");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("🚀 Login form submitted");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.access_token);
        window.location.href = "books.html";
      } else {
        errorDiv.style.display = "block";
        errorDiv.textContent = data.message || "Login failed";
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      errorDiv.style.display = "block";
      errorDiv.textContent = "Network or server error";
    }
  });
});