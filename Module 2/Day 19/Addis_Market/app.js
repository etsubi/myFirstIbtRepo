const form = document.querySelector("#add-form");
const nameInput = document.querySelector("#name");
const priceInput = document.querySelector("#price");
const list = document.querySelector("#list");
const totalEl = document.querySelector("#total");

function addRow(name, price) {
  const li = document.createElement("li");

  li.dataset.price = price;

  const itemInfo = document.createElement("div");

  itemInfo.classList.add("item-info");

  const nameEl = document.createElement("span");

  nameEl.textContent = name;

  const priceEl = document.createElement("span");

  priceEl.textContent = price.toFixed(2) + " ETB";

  itemInfo.append(nameEl, priceEl);

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  deleteButton.classList.add("delete");

  li.append(itemInfo, deleteButton);

  list.append(li);
}

function updateTotal() {
  const items = list.querySelectorAll("li");

  let total = 0;

  items.forEach(function (item) {
    total += Number(item.dataset.price);
  });

  totalEl.textContent = total.toFixed(2);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();

  const price = Number(priceInput.value);

  if (!name || !price || price <= 0) {
    alert("Please enter both an item name and a valid price.");

    return;
  }

  addRow(name, price);

  form.reset();

  updateTotal();
});

list.addEventListener("click", function (event) {
  if (event.target.matches(".delete")) {
    event.target.closest("li").remove();

    updateTotal();
  } else if (event.target.closest("li")) {
    event.target.closest("li").classList.toggle("bought");
  }
});
