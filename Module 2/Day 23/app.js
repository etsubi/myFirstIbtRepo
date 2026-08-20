const state = {
  rooms: [],
  booking: [],
  search: "",
  category: "All",
  maxPrice: 12000,
};

const roomGrid = document.querySelector("#room-grid");
const searchInput = document.querySelector("#room-search");
const priceValue = document.querySelector("#price-value");
const categoryButtons = document.querySelectorAll(".category-button");
const priceFilter = document.querySelector("#price-filter");
const bookingList = document.querySelector("#booking-list");
const totalPrice = document.querySelector("#total-price");

// Load rooms from JSON file
async function loadRooms() {
  roomGrid.textContent = "Loading rooms...";

  try {
    const response = await fetch("data/rooms.json");

    if (!response.ok) {
      throw new Error("Could not load rooms");
    }

    state.rooms = await response.json();

    render();
  } catch (error) {
    console.error(error);
    roomGrid.textContent = "Could not load rooms.";
  }
}

// Render rooms based on filters
function render() {
  const rooms = state.rooms.filter((room) => {
    const searchTerm = state.search.toLowerCase();

    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm) ||
      room.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      state.category === "All" || room.category === state.category;

    const matchesPrice = room.price <= state.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  roomGrid.innerHTML = rooms
    .map(
      (room) => `
      <article class="room-card">
        <img
          src="${room.image}"
          alt="${room.name}"
        />

        <div class="room-info">
          <div class="room-top">
            <span>${room.category}</span>
            <span>${room.available ? "Available" : "Unavailable"}</span>
          </div>

          <h3>${room.name}</h3>

          <p>${room.description}</p>

          <div class="room-bottom">
            <div>
              <strong>${room.price.toLocaleString()} ETB</strong>
              <small>/ night</small>
            </div>

            <button
              class="reserve-button"
              data-id="${room.id}"
              ${!room.available ? "disabled" : ""}
            >
              Reserve
            </button>
          </div>
        </div>
      </article>
    `,
    )
    .join("");

  // Reserve button event listeners
  document.querySelectorAll(".reserve-button").forEach((button) => {
    button.addEventListener("click", () => {
      const roomId = Number(button.dataset.id);

      const room = state.rooms.find((r) => r.id === roomId);

      const alreadyBooked = state.booking.some((r) => r.id === roomId);

      if (alreadyBooked) return;

      state.booking.push(room);

      renderBookings();
    });
  });
}

// Render bookings
function renderBookings() {
  if (state.booking.length === 0) {
    bookingList.innerHTML = `
      <p class="empty-booking">
        No rooms reserved yet.
      </p>
    `;

    totalPrice.textContent = "0 ETB";
    return;
  }

  bookingList.innerHTML = state.booking
    .map(
      (room) => `
      <div class="booking-item">
        <div>
          <h4>${room.name}</h4>
          <small>${room.category}</small>
        </div>

        <strong>${room.price.toLocaleString()} ETB</strong>
      </div>
    `,
    )
    .join("");

  const total = state.booking.reduce((sum, room) => {
    return sum + room.price;
  }, 0);

  totalPrice.textContent = `${total.toLocaleString()} ETB`;
}

// Search input event listener
searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;
  render();
});

// Catagory buttons event listeners
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.textContent;

    categoryButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    render();
  });
});

// Price filter event listener
priceFilter.addEventListener("input", (event) => {
  state.maxPrice = Number(event.target.value);

  priceValue.textContent = `${state.maxPrice.toLocaleString()} ETB / night`;

  render();
});

// start the app
renderBookings();
loadRooms();
