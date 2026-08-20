const state = {
  rooms: [],
  booking: [],
  search: "",
  category: "All",
  maxPrice: 12000,
};

const roomGrid = document.querySelector("#room-grid");

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

function render() {
  const rooms = state.rooms;

  roomGrid.innerHTML = rooms
    .map(
      (room) => `
    <article class="room-card">

      <img
        src="${room.image}"
        alt="${room.name} ${room.category} room"
      />

      <div class="room-info">

        <div class="room-top">
          <span>${room.category}</span>
          <span>
            ${room.available ? "Available" : "Unavailable"}
          </span>
        </div>

        <h3>${room.name}</h3>

        <p>
          ${room.description}
        </p>

        <div class="room-bottom">

          <div>
            <strong>
              ${room.price.toLocaleString()} ETB
            </strong>

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
}

loadRooms();
