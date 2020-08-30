const closeBtn = document.querySelectorAll(".close");
const userPanel = document.getElementById("user_panel");

if (closeBtn.length > 0) {
  closeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.style.display = "none";
    });
  });
}
if (userPanel) {
  userPanel.addEventListener("click", (e) => {
    e.target.nextElementSibling.classList.toggle("user--show");
  });
}
