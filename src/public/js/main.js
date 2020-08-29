const closeBtn = document.querySelectorAll(".close");

if (closeBtn.length > 0) {
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.style.display = "none";
    });
  });
}
