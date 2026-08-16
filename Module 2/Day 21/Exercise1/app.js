const button = document.querySelector("#themeButton");

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}

function loadTheme() {
  return localStorage.getItem("theme");
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

const savedTheme = loadTheme();

if (savedTheme) {
  applyTheme(savedTheme);
}

button.addEventListener("click", function () {
  const isDark = document.body.classList.contains("dark");

  if (isDark) {
    applyTheme("light");
    saveTheme("light");
  } else {
    applyTheme("dark");
    saveTheme("dark");
  }
});
