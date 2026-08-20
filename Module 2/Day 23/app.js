const state = {
  rooms: [],
  booking: [],
  search: "",
  category: "All",
  maxPrice: 12000,
};

// DOM Elements
const roomGrid = document.querySelector("#room-grid");
const searchInput = document.querySelector("#room-search");
const categoryButtons = document.querySelectorAll(".category-button");
const priceFilter = document.querySelector("#price-filter");
const priceValue = document.querySelector("#price-value");

const bookingList = document.querySelector("#booking-list");
const totalPrice = document.querySelector("#total-price");

// Room Modal Elements
const roomModal = document.querySelector("#room-modal");
const modalClose = document.querySelector("#modal-close");
const modalImage = document.querySelector("#modal-image");
const modalCategory = document.querySelector("#modal-category");
const modalName = document.querySelector("#modal-name");
const modalDescription = document.querySelector("#modal-description");
const modalPrice = document.querySelector("#modal-price");
const modalAmenities = document.querySelector("#modal-amenities");

const stayNights = document.querySelector("#stay-nights");
const stayGuests = document.querySelector("#stay-guests");

const modalTotalPrice = document.querySelector("#modal-total-price");
const modalReserve = document.querySelector("#modal-reserve");

let selectedRoom = null;

// Local Storage
function saveBookings() {
  localStorage.setItem("bookings", JSON.stringify(state.booking));
}

function loadBookings() {
  const saved = localStorage.getItem("bookings");

  try {
    state.booking = saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load bookings:", error);

    state.booking = [];
  }
}

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

// Open room details modal
function openRoomModal(room) {
  selectedRoom = room;

  modalImage.src = room.image;
  modalImage.alt = `${room.name} ${room.category} room`;

  modalCategory.textContent = room.category;
  modalName.textContent = room.name;
  modalDescription.textContent = room.description;

  modalPrice.textContent = `${room.price.toLocaleString()} ETB / night`;

  // Reset values when opening a new room
  stayNights.value = 1;
  stayGuests.value = 1;

  // Set the maximum number of guests
  // based on the room capacity from rooms.json
  stayGuests.max = room.capacity;

  // Show room amenities
  modalAmenities.innerHTML = room.amenities
    .map(
      (amenity) => `
        <span class="amenity">
          ${amenity}
        </span>
      `,
    )
    .join("");

  updateModalTotal();

  roomModal.classList.add("open");

  roomModal.setAttribute("aria-hidden", "false");
}

// Close room details modal
function closeRoomModal() {
  roomModal.classList.remove("open");

  roomModal.setAttribute("aria-hidden", "true");

  selectedRoom = null;
}

// Calculate modal total price
function updateModalTotal() {
  if (!selectedRoom) return;

  const nights = Number(stayNights.value) || 1;

  const total = selectedRoom.price * nights;

  modalTotalPrice.textContent = `${total.toLocaleString()} ETB`;
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
    .map((room) => {
      const isBooked = state.booking.some((booked) => booked.id === room.id);

      return `
        <article
          class="room-card"
          data-id="${room.id}"
        >

          <img
            src="${room.image}"
            alt="${room.name} ${room.category} room"
          />

          <div class="room-info">

            <div class="room-top">

              <span>
                ${room.category}
              </span>

              <span>
                ${room.available ? "Available" : "Unavailable"}
              </span>

            </div>

            <h3>
              ${room.name}
            </h3>

            <p>
              ${room.description}
            </p>

            <div class="room-bottom">

              <div>

                <strong>
                  ${room.price.toLocaleString()} ETB
                </strong>

                <small>
                  / night
                </small>

              </div>

              <button
                class="reserve-button ${isBooked ? "reserved" : ""}"
                data-id="${room.id}"
                ${!room.available || isBooked ? "disabled" : ""}
              >
                ${isBooked ? "Reserved ✓" : "Reserve"}
              </button>

            </div>

          </div>

        </article>
      `;
    })
    .join("");

  // Reserve button event listeners
  document.querySelectorAll(".reserve-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      // Stop the room card from opening
      // the modal when Reserve is clicked
      event.stopPropagation();

      const roomId = Number(button.dataset.id);

      const room = state.rooms.find((r) => r.id === roomId);

      if (!room) return;

      const alreadyBooked = state.booking.some((r) => r.id === roomId);

      if (alreadyBooked) return;

      // Add room to booking
      state.booking.push({
        ...room,
        nights: 1,
        guests: 1,
        total: room.price,
      });

      saveBookings();

      render();

      renderBookings();

      // Let the user immediately see
      // that the room was added
      document.querySelector("#stays").scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Room card click event listeners
  document.querySelectorAll(".room-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Do not open the modal when
      // the Reserve button is clicked
      if (event.target.closest(".reserve-button")) {
        return;
      }

      const roomId = Number(card.dataset.id);

      const room = state.rooms.find((r) => r.id === roomId);

      if (!room) return;

      openRoomModal(room);
    });
  });
}

// Render bookings
function renderBookings() {
  if (state.booking.length === 0) {
    bookingList.innerHTML = `
      <div class="empty-booking">

        <p>
          No rooms reserved yet.
        </p>

        <small>
          Your reserved rooms will appear here.
        </small>

      </div>
    `;

    totalPrice.textContent = "0 ETB";

    return;
  }

  bookingList.innerHTML = state.booking
    .map((room) => {
      const nights = room.nights || 1;

      const total = room.total || room.price * nights;

      return `
          <div class="booking-item">

            <div>

              <h4>
                ${room.name}
              </h4>

              <small>
                ${room.category}
                ·
                ${nights}
                night${nights > 1 ? "s" : ""}
              </small>

            </div>

            <div class="booking-right">

              <strong>
                ${total.toLocaleString()} ETB
              </strong>

              <button
                class="remove-booking"
                data-id="${room.id}"
              >
                Remove
              </button>

            </div>

          </div>
        `;
    })
    .join("");

  // Calculate total booking price
  const total = state.booking.reduce((sum, room) => {
    const nights = room.nights || 1;

    return sum + room.price * nights;
  }, 0);

  totalPrice.textContent = `${total.toLocaleString()} ETB`;

  // Remove booking
  document.querySelectorAll(".remove-booking").forEach((button) => {
    button.addEventListener("click", () => {
      const roomId = Number(button.dataset.id);

      state.booking = state.booking.filter((room) => room.id !== roomId);

      saveBookings();

      render();

      renderBookings();
    });
  });
}

// Search input event listener
searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;

  render();
});

// Category buttons event listeners
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

// Room modal close button
modalClose.addEventListener("click", closeRoomModal);

// Close modal when clicking
// outside the modal content
roomModal.addEventListener("click", (event) => {
  if (event.target === roomModal) {
    closeRoomModal();
  }
});

// Number of nights input
stayNights.addEventListener("input", () => {
  let nights = Number(stayNights.value);

  if (nights < 1) {
    nights = 1;
    stayNights.value = 1;
  }

  updateModalTotal();
});

// Number of guests input
stayGuests.addEventListener("input", () => {
  if (!selectedRoom) return;

  let guests = Number(stayGuests.value);

  if (guests < 1) {
    guests = 1;
    stayGuests.value = 1;
  }

  if (guests > selectedRoom.capacity) {
    guests = selectedRoom.capacity;

    stayGuests.value = selectedRoom.capacity;
  }
});

// Confirm reservation from modal
modalReserve.addEventListener("click", () => {
  if (!selectedRoom) return;

  const nights = Number(stayNights.value) || 1;

  const guests = Number(stayGuests.value) || 1;

  const alreadyBooked = state.booking.some(
    (room) => room.id === selectedRoom.id,
  );

  if (alreadyBooked) {
    closeRoomModal();
    return;
  }

  const total = selectedRoom.price * nights;

  // Add room to bookings
  state.booking.push({
    ...selectedRoom,
    nights: nights,
    guests: guests,
    total: total,
  });

  // Save booking to Local Storage
  saveBookings();

  // Update room cards
  render();

  // Update My Stays
  renderBookings();

  // Close modal
  closeRoomModal();

  // Show My Stays
  document.querySelector("#stays").scrollIntoView({
    behavior: "smooth",
  });
});

// Start the app
loadBookings();

renderBookings();

loadRooms();
