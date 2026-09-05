const state = {
  rooms: [],
  booking: [],
  reservations: [],
  search: "",
  category: "All",
  maxPrice: 12000,
};

// CONSTANTS

const STORAGE_KEY = "bookings";
const RESERVATIONS_KEY = "reservations";

const DEFAULT_NIGHTS = 1;
const DEFAULT_GUESTS = 1;

const MIN_NIGHTS = 1;
const MIN_GUESTS = 1;

const ROOM_DATA_URL = "data/rooms.json";

const PHONE = /^(?:\+251|0)9\d{8}$/;

const NAME_PATTERN = /^[A-Za-zÀ-ÿ' -]+$/;

// DOM ELEMENTS

const roomGrid = document.querySelector("#room-grid");

const searchInput = document.querySelector("#room-search");

const categoryButtons = document.querySelectorAll(".category-button");

const priceFilter = document.querySelector("#price-filter");

const priceValue = document.querySelector("#price-value");

const bookingList = document.querySelector("#booking-list");

const totalPrice = document.querySelector("#total-price");

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

// CHECKOUT ELEMENTS

const checkoutForm = document.querySelector("#checkout-form");

const nameInput = document.querySelector("#guest-name");

const phoneInput = document.querySelector("#guest-phone");

const confirmation = document.querySelector("#confirmation");

let selectedRoom = null;

// Save current states to localStorage

function saveBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.booking));
}

function saveReservations() {
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(state.reservations));
}

function loadBookings() {
  const saved = localStorage.getItem(STORAGE_KEY);

  try {
    const bookings = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(bookings)) {
      state.booking = [];
      return;
    }

    state.booking = bookings.map((booking) => ({
      ...booking,
      nights: booking.nights || DEFAULT_NIGHTS,
      guests: booking.guests || DEFAULT_GUESTS,
    }));
  } catch (error) {
    console.error("Could not load bookings:", error);

    state.booking = [];
  }
}

// Load confirmed reservations

function loadReservations() {
  const saved = localStorage.getItem(RESERVATIONS_KEY);

  try {
    const reservations = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(reservations)) {
      state.reservations = [];
      return;
    }

    state.reservations = reservations.map((reservation) => ({
      ...reservation,
      items: Array.isArray(reservation.items) ? reservation.items : [],
    }));
  } catch (error) {
    console.error("Could not load reservations:", error);

    state.reservations = [];
  }
}


async function loadRooms() {
  roomGrid.textContent = "Loading rooms...";

  try {
    const response = await fetch(ROOM_DATA_URL);

    if (!response.ok) {
      throw new Error("Could not load rooms");
    }

    const rooms = await response.json();

    if (!Array.isArray(rooms)) {
      throw new Error("Room data is not valid");
    }

    state.rooms = rooms;

    render();
  } catch (error) {
    console.error("Could not load rooms:", error);

    roomGrid.innerHTML = `
      <div class="empty-booking">
        <p>Could not load rooms.</p>

        <small>
          Please try again later.
        </small>
      </div>
    `;
  }
}

// Find a room by its ID

function findRoom(roomId) {
  return state.rooms.find((room) => room.id === roomId);
}


function isRoomBooked(roomId) {
  return state.booking.some((booking) => booking.id === roomId);
}


function formatPrice(amount) {
  return `${Number(amount).toLocaleString()} ETB`;
}


function calculateBookingTotal(booking) {
  const nights = Number(booking.nights) || DEFAULT_NIGHTS;

  const price = Number(booking.price) || 0;

  return price * nights;
}


function calculateTotal() {
  return state.booking.reduce((total, booking) => {
    return total + calculateBookingTotal(booking);
  }, 0);
}

// ROOM MODAL

function openRoomModal(room) {
  if (!room) return;

  selectedRoom = room;

  modalImage.src = room.image;

  modalImage.alt = `${room.name} ${room.category} room`;

  modalCategory.textContent = room.category;

  modalName.textContent = room.name;

  modalDescription.textContent = room.description;

  modalPrice.textContent = formatPrice(room.price);

  stayNights.value = DEFAULT_NIGHTS;

  stayGuests.value = DEFAULT_GUESTS;

  renderAmenities(room.amenities);

  updateModalTotal();

  roomModal.classList.add("open");

  roomModal.setAttribute("aria-hidden", "false");
}


function renderAmenities(amenities = []) {
  modalAmenities.innerHTML = amenities
    .map(
      (amenity) => `
          <span class="amenity">
            ${amenity}
          </span>
        `,
    )
    .join("");
}

function closeRoomModal() {
  roomModal.classList.remove("open");

  roomModal.setAttribute("aria-hidden", "true");

  selectedRoom = null;
}

function updateModalTotal() {
  if (!selectedRoom) return;

  const nights = Number(stayNights.value) || DEFAULT_NIGHTS;

  const total = selectedRoom.price * nights;

  modalTotalPrice.textContent = formatPrice(total);
}

// RENDER ROOMS
function getFilteredRooms() {
  const searchTerm = state.search.toLowerCase().trim();

  return state.rooms.filter((room) => {
    const roomName = room.name.toLowerCase();

    const roomCategory = room.category.toLowerCase();

    const matchesSearch =
      roomName.includes(searchTerm) || roomCategory.includes(searchTerm);

    const matchesCategory =
      state.category === "All" || room.category === state.category;

    const matchesPrice = Number(room.price) <= state.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });
}

// Render the room cards

function renderRooms() {
  const rooms = getFilteredRooms();

  if (rooms.length === 0) {
    roomGrid.innerHTML = `
      <div class="empty-booking">
        <p>No rooms found.</p>

        <small>
          Try changing your search or filters.
        </small>
      </div>
    `;

    return;
  }

  roomGrid.innerHTML = rooms
    .map((room) => {
      const booked = isRoomBooked(room.id);

      const unavailable = !room.available;

      return `
          <article
            class="room-card"
            data-id="${room.id}"
          >

            <img
              src="${room.image}"
              alt="${room.name}"
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
                    ${formatPrice(room.price)}
                  </strong>

                  <small>
                    / night
                  </small>

                </div>

                <button
                  type="button"
                  class="reserve-button ${booked ? "reserved" : ""}"
                  data-id="${room.id}"
                  ${unavailable || booked ? "disabled" : ""}
                >
                  ${booked ? "Reserved ✓" : "Reserve"}
                </button>

              </div>

            </div>

          </article>
        `;
    })
    .join("");
}

// ROOM EVENTS

function attachRoomEvents() {
  document.querySelectorAll(".room-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Don't open the modal when clicking
      // the Reserve button

      if (event.target.closest(".reserve-button")) {
        return;
      }

      const roomId = Number(card.dataset.id);

      const room = findRoom(roomId);

      if (room && room.available) {
        openRoomModal(room);
      }
    });
  });

  // Reserve button event listeners

  document.querySelectorAll(".reserve-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      const roomId = Number(button.dataset.id);

      const room = findRoom(roomId);

      if (!room || isRoomBooked(roomId)) {
        return;
      }

      openRoomModal(room);
    });
  });
}

// MAIN RENDER

function render() {
  renderRooms();
  renderBookings();
  attachRoomEvents();
}

// Confirm reservation from modal

function confirmReservation() {
  if (!selectedRoom) return;

  const nights = Number(stayNights.value);

  const guests = Number(stayGuests.value);

  // Prevent invalid values

  if (
    !Number.isFinite(nights) ||
    !Number.isFinite(guests) ||
    nights < MIN_NIGHTS ||
    guests < MIN_GUESTS
  ) {
    return;
  }

  // Prevent duplicate reservations

  if (isRoomBooked(selectedRoom.id)) {
    closeRoomModal();

    return;
  }

  const booking = {
    ...selectedRoom,
    nights,
    guests,
  };

  state.booking.push(booking);

  saveBookings();

  render();

  renderBookings();

  closeRoomModal();

  document.querySelector("#stays")?.scrollIntoView({
    behavior: "smooth",
  });
}

// Render current bookings and confirmed reservation history

function renderBookings() {
  const hasCurrentBookings = state.booking.length > 0;

  const hasReservations = state.reservations.length > 0;

  if (!hasCurrentBookings && !hasReservations) {
    bookingList.innerHTML = `
      <div class="empty-booking">

        <p>
          No stays yet.
        </p>

        <small>
          Your current and confirmed
          reservations will appear here.
        </small>

      </div>
    `;

    totalPrice.textContent = "0 ETB";

    return;
  }

  let html = "";

  // CURRENT BOOKINGS

  if (hasCurrentBookings) {
    html += `
      <div class="stay-group">

        <p class="section-label">
          CURRENT RESERVATION
        </p>
    `;

    state.booking.forEach((room) => {
      const nights = Number(room.nights) || DEFAULT_NIGHTS;

      const guests = Number(room.guests) || DEFAULT_GUESTS;

      const roomTotal = calculateBookingTotal(room);

      html += `
        <div class="booking-item">

          <div>

            <h4>
              ${room.name}
            </h4>

            <small>
              ${room.category}
            </small>

            <small>
              ${nights}
              night${nights > 1 ? "s" : ""}
              ·
              ${guests}
              guest${guests > 1 ? "s" : ""}
            </small>

          </div>

          <div class="booking-right">

            <strong>
              ${formatPrice(roomTotal)}
            </strong>

            <button
              type="button"
              class="remove-booking"
              data-id="${room.id}"
            >
              Remove
            </button>

          </div>

        </div>
      `;
    });

    html += `
      </div>
    `;
  }

  // CONFIRMED RESERVATIONS

  if (hasReservations) {
    html += `
      <div class="stay-group">

        <p class="section-label">
          BOOKING HISTORY
        </p>
    `;

    state.reservations.forEach((reservation) => {
      const date = new Date(reservation.placedAt);

      const formattedDate = date.toLocaleDateString("en-ET", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      html += `
        <div class="booking-item confirmed-booking">

          <div>

            <h4>
              Reservation confirmed ✓
            </h4>

            <small>
              ${reservation.name}
            </small>

            <small>
              ${formattedDate}
            </small>

            <small>
              ${reservation.items.length}
              room${reservation.items.length > 1 ? "s" : ""}
            </small>

          </div>

          <div class="booking-right">

            <strong>
              ${formatPrice(reservation.total)}
            </strong>

            <span class="reservation-status">
              Confirmed
            </span>

          </div>

        </div>

        <div class="reservation-details">

          ${reservation.items
            .map(
              (room) => `
                <div>
                  <strong>${room.name}</strong>
                  <span>
                    ${room.nights} night${room.nights > 1 ? "s" : ""}
                    ·
                    ${room.guests} guest${room.guests > 1 ? "s" : ""}
                  </span>
                </div>
              `,
            )
            .join("")}

        </div>
      `;
    });

    html += `
      </div>
    `;
  }

  bookingList.innerHTML = html;


  totalPrice.textContent = formatPrice(calculateTotal());

  attachBookingEvents();
}

// Attach remove booking events

function attachBookingEvents() {
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

// Validate checkout information

function validateCheckout({ name, phone }) {
  const cleanName = name.trim();

  const cleanPhone = phone.trim();


  if (!cleanName) {
    return "Please enter your name.";
  }


  if (!NAME_PATTERN.test(cleanName)) {
    return "Name should contain letters only.";
  }


  if (!cleanPhone) {
    return "Please enter your mobile number.";
  }

  // Check Ethiopian phone format

  if (!PHONE.test(cleanPhone)) {
    return "Enter a valid Ethiopian phone number.";
  }

  // Check whether there is a reservation

  if (state.booking.length === 0) {
    return "Your cart is empty.";
  }

  return "";
}

// Validate name while typing

if (nameInput) {
  nameInput.addEventListener("input", () => {
    nameInput.value = nameInput.value.replace(/[^A-Za-zÀ-ÿ' -]/g, "");
  });
}

// Validate phone while typing

if (phoneInput) {
  phoneInput.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9+]/g, "");

    if (phoneInput.value.includes("+")) {
      phoneInput.value = "+" + phoneInput.value.replace(/\+/g, "").slice(0, 12);
    }
  });
}

function placeOrder(data) {
  const order = {
    ...data,

    items: [...state.booking],

    total: calculateTotal(),

    placedAt: new Date().toISOString(),
  };

  console.log("Order placed:", order);

  const total = order.total;

  // SAVE TO RESERVATION HISTORY

  state.reservations.push(order);

  saveReservations();

  state.booking = [];

  saveBookings();

  render();

  renderBookings();

  checkoutForm.reset();

  showConfirmation(order);
}

// Show order confirmation

function showConfirmation(order) {
  confirmation.innerHTML = `
    <strong>
      Reservation confirmed! ✓
    </strong>

    <span>
      Your reservation for
      ${order.items.length}
      room${order.items.length > 1 ? "s" : ""}
      has been confirmed.
    </span>

    <span>
      Total:
      ${formatPrice(order.total)}
    </span>

    <small>
      Your reservation has been saved
      under My Stays.
    </small>
  `;


  confirmation.hidden = false;

  document.querySelector("#stays")?.scrollIntoView({
    behavior: "smooth",
  });
}

// Checkout form

if (checkoutForm) {
  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      name: nameInput.value,
      phone: phoneInput.value,
    };

    const message = validateCheckout(data);

    // Hide old confirmation first

    confirmation.hidden = true;

    confirmation.textContent = "";

    if (message) {
      confirmation.textContent = message;

      confirmation.hidden = false;

      return;
    }

    placeOrder(data);
  });
}

// Search input event listener

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    state.search = event.target.value;

    render();
  });
}

// Category buttons event listeners

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.textContent.trim();

    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    render();
  });
});

// Price filter event listener

if (priceFilter) {
  priceFilter.addEventListener("input", (event) => {
    state.maxPrice = Number(event.target.value);

    priceValue.textContent = `${state.maxPrice.toLocaleString()} ETB / night`;

    render();
  });
}

// MODAL EVENTS


if (modalClose) {
  modalClose.addEventListener("click", () => {
    closeRoomModal();
  });
}

if (roomModal) {
  roomModal.addEventListener("click", (event) => {
    if (event.target === roomModal) {
      closeRoomModal();
    }
  });
}

// Update total when nights change

if (stayNights) {
  stayNights.addEventListener("input", () => {
    updateModalTotal();
  });
}


if (stayGuests) {
  stayGuests.addEventListener("input", () => {
    updateModalTotal();
  });
}

if (modalReserve) {
  modalReserve.addEventListener("click", () => {
    confirmReservation();
  });
}

loadBookings();

loadReservations();

renderBookings();

loadRooms();
