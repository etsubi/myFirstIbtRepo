const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchUl = document.querySelector("#watchlist");
const addBtn = document.querySelector("#watch");

state.rates = {
  USD: 0.0177,
  EUR: 0.0164,
  KES: 2.29,
  GBP: 0.0139,
};

function render() {
  const codes = Object.keys(state.rates);

  select.innerHTML = codes
    .map((currency) => `<option>${currency}</option>`)
    .join("");

  select.value = state.currency;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amt = Number(amount.value);

  if (amt <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  state.currency = select.value;

  const rate = state.rates[state.currency];

  const converted = (amt * rate).toFixed(2);

  result.textContent = `${amt} ETB = ${converted} ${state.currency}`;
});

addBtn.addEventListener("click", () => {
  const currency = select.value;

  if (state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);

  renderWatchlist();
});

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUl.innerHTML = "<li>No currencies yet</li>";
    return;
  }

  watchUl.innerHTML = state.watchlist
    .map((currency) => {
      const rate = state.rates[currency];

      return `
                <li data-c="${currency}">
                1 ETB = ${rate} ${currency}
                <button class="remove">Remove</button>
                </li>
    
            `;
    })
    .join("");
}

watchUl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) {
    return;
  }
  const currency = e.target.closest("li").dataset.c;

  state.watchlist = state.watchlist.filter((item) => item !== currency);
  renderWatchlist();
});
render();
renderWatchlist();
