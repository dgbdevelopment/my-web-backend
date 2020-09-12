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

//Articles Query
const blogSelect = document.getElementById("blog__select");
if (blogSelect) {
  const title = blogSelect.firstElementChild;
  title.addEventListener("click", function (e) {
    this.parentElement.classList.toggle("blog__select--expanded");
  });
  const order = document.querySelectorAll(".select__option");
  order.forEach((elem) => {
    elem.addEventListener("click", () => {
      doQuery(elem.firstElementChild.dataset.query, elem.id);
      title.firstElementChild.textContent = elem.firstElementChild.textContent;
      title.parentElement.classList.remove("blog__select--expanded");
    });
  });
}
function doQuery(query, order) {
  location.replace(location.origin + `/article/search/${order}/${query}`);
}
