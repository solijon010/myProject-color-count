// const userName = window.prompt("ismingizni yozing!");

// innerHTML
// const title = document.querySelector("h1");
// // title.innerHTML += ` <span style="color=orange">${userName}!</span>`;

// const sarlovha = document.createElement("h2");

// sarlovha.textContent = "Bu yangi yaratilgan sarlovha";
// document.body.append(sarlovha);

// Info: :localstorage
// Primative
// localStorage.setItem("name", "Solijon");
// console.log(localStorage.getItem("name"));

// JSON=> JavaScript Object Notation

// non-primative
// const user = {
//   name: "Solijon",
//   age: 22,
//   isMarried: false,
// };

// // localStorage.setItem("userInfo", JSON.stringify(user));

// const newUser = JSON.parse(localStorage.getItem("userInfo"));

// console.log(newUser.age);

// IDea: NEw Project boshlandi

const bodyEl = document.body;
const formEl = document.querySelector(".form");
const wrapperEl = document.querySelector(".wrapper");

// colors
const colors = JSON.parse(localStorage.getItem("colors")) || [];

// active colors
let activeColor = colors.length - 1;

// create square

const createSquareEl = (colors) => {
  wrapperEl.innerHTML = "";
  colors.forEach((color) => {
    let squareEl = document.createElement("span");
    squareEl.className = "square";
    squareEl.style.backgroundColor = color;
    wrapperEl.append(squareEl);
  });
  wrapperEl.children[activeColor].classList.add("active-square")
};
createSquareEl(colors);

// submit form

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const color = formData.get("color").trim();
  bodyEl.style.backgroundColor = color;
  if (
    bodyEl.style.backgroundColor === color &&
    colors[colors.length - 1] != color
  ) {
    colors.push(color);
    createSquareEl(colors);
    localStorage.setItem("colors", JSON.stringify(colors));
  }
  console.log(colors);

  formEl.reset();
});
