const bodyEl = document.body;
const formEl = document.querySelector(".form");
const wrapperEl = document.querySelector(".wrapper");
const backBtn = document.querySelector(".buttons .btn:first-child");
const nextBtn = document.querySelector(".buttons .btn:last-child");

// Ma'lumotni sessionStorage'dan olish (localStorage o‘rniga)
let colors = JSON.parse(sessionStorage.getItem("colors")) || [];

// 🔹 Eski formatni yangilaymiz (faqat string bo‘lsa)
if (Array.isArray(colors) && typeof colors[0] === "string") {
  colors = colors.map(c => ({ color: c, count: 1 }));
}

// 🔹 Noto‘g‘ri yoki bo‘sh elementlarni tozalaymiz
colors = colors.filter(c => c && typeof c.color === "string" && c.color.trim() !== "");

// 🔹 Tozalangan versiyani qayta saqlaymiz
sessionStorage.setItem("colors", JSON.stringify(colors));

// 🔹 Active index
let activeColor = colors.length ? colors.length - 1 : -1;

// 🔹 Rang kvadratlarini chizish
const createSquareEl = (colors) => {
  wrapperEl.innerHTML = "";

  colors.forEach((colorObj, index) => {
    if (!colorObj.color) return; // bo‘sh obyekt chiqmasin

    const squareEl = document.createElement("span");
    squareEl.className = "square";
    squareEl.style.backgroundColor = colorObj.color;
    squareEl.dataset.index = index;
    squareEl.title = `${colorObj.color} (${colorObj.count})`;

    // Bosilganda tanlanadigan qilib qo‘yamiz
    squareEl.addEventListener("click", () => {
      const prev = wrapperEl.querySelector(".active-square");
      if (prev) prev.classList.remove("active-square");
      activeColor = index;
      squareEl.classList.add("active-square");
      bodyEl.style.backgroundColor = colorObj.color;
      sessionStorage.setItem("colors", JSON.stringify(colors));
    });

    wrapperEl.appendChild(squareEl);
  });

  // Active rangni tiklash
  if (activeColor >= 0 && wrapperEl.children[activeColor]) {
    wrapperEl.children[activeColor].classList.add("active-square");
    bodyEl.style.backgroundColor = colors[activeColor].color;
  }
};

// 🔹 Dastlab render
createSquareEl(colors);

// 🔹 Rang kiritish
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const color = formData.get("color").trim().toLowerCase();

  if (!color) return formEl.reset();

  const lastColor = colors.length ? colors[colors.length - 1].color : null;

  // Agar oxirgi rang shu bo‘lsa — sanog‘ini oshiramiz
  if (lastColor === color) {
    colors[colors.length - 1].count++;
  } else {
    // Yangi rang obyekt sifatida
    colors.push({ color, count: 1 });
  }

  // Yangilash
  activeColor = colors.length - 1;
  sessionStorage.setItem("colors", JSON.stringify(colors));
  createSquareEl(colors);
  bodyEl.style.backgroundColor = color;
  formEl.reset();
});

// 🔹 Back tugmasi
backBtn.addEventListener("click", () => {
  if (colors.length === 0) return;
  activeColor = (activeColor - 1 + colors.length) % colors.length;
  bodyEl.style.backgroundColor = colors[activeColor].color;
  createSquareEl(colors);
});

// 🔹 Next tugmasi
nextBtn.addEventListener("click", () => {
  if (colors.length === 0) return;
  activeColor = (activeColor + 1) % colors.length;
  bodyEl.style.backgroundColor = colors[activeColor].color;
  createSquareEl(colors);
});
