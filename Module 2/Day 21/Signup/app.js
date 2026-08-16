const form = document.querySelector("#signupForm");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const error = document.querySelector("#error");

const count = document.querySelector("#count");

const PHONE = /^(?:\+251|0)9\d{8}$/;

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

function validate(name, phone) {
  if (name.trim().length < 2) {
    return "Enter your full name.";
  }

  if (!PHONE.test(phone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  return "";
}

function updateCount() {
  const people = load("signups");

  count.textContent = people.length + " people have signed up.";
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  error.textContent = "";

  const name = nameInput.value.trim();

  const phone = phoneInput.value.trim();

  const message = validate(name, phone);

  if (message) {
    error.textContent = message;

    return;
  }

  const people = load("signups");

  const person = {
    name: name,
    phone: phone,
  };

  people.push(person);

  save("signups", people);

  form.reset();

  error.textContent = "";

  updateCount();
});

updateCount();
