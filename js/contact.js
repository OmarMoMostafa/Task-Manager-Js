document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  form.addEventListener("submit", (e) => {
    if (!nameInput.value.trim()) {
      e.preventDefault();
      alert("Please enter your name.");
    }

    if (!isValidEmail(emailInput.value)) {
      e.preventDefault();
      alert("Please enter a valid email address.");
    }
  });

  function isValidEmail(email) {
    // Basic email format validation (you can enhance this)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
