import { format, isFuture, isToday, startOfToday } from "date-fns";
import { setDOM } from "../domUpdates";
import { addBooking, createBooking } from "../js/bookings";
import {
  filterRooms,
  filterRoomsByRange,
  getAvailableRooms,
  getRoom,
} from "../js/rooms";
import { currentCustomer, localData, roomSettings } from "../scripts";
import { dropdownHTML, navHTML } from "./domNav";

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target.classList.contains("book-room-button")) {
    const calendar = document.getElementById("booking-date");
    // fixes the bug of calendar input being in local time
    // but Date uses UTC time and so they will clash and change day back
    const calendarParse = new Date(`${calendar.value}T00:00:00`);

    const roomDOM = e.target.closest(".room-card");
    const roomNumber = +roomDOM.dataset.number;
    const room = getRoom(roomNumber, localData.getRooms());

    const booking = createBooking(
      currentCustomer.id,
      calendarParse,
      room.number
    );

    addBooking(localData, booking).then(() =>
      setDOM(document.getElementById("root"), () => bookingPage(calendarParse))
    );
  } else if (e.target.classList.contains("clear-filter-button")) {
    clearFilterContainer();
  }

  if (e.target.closest(".filter-container")) {
    const calendar = document.getElementById("booking-date");
    // fixes the bug of calendar input being in local time
    // but Date uses UTC time and so they will clash and change day back
    const calendarParse = new Date(`${calendar.value}T00:00:00`);
    updateRoomsHTML(localData, calendarParse);
  }
});

// event listener for calendar input
document.getElementById("root").addEventListener("change", (e) => {
  if (e.target.id === "booking-date") {
    const calendar = document.getElementById("booking-date");
    const calendarParse = new Date(`${calendar.value}T00:00:00`);
    setDOM(e.currentTarget, () => bookingPage(calendarParse));
  }
});

document.getElementById("root").addEventListener("mouseout", (e) => {
  const dropdown = e.target.closest(".dropdown");
  if (!dropdown) {
    return;
  }

  let calendar, calendarParse;
  if (e.target.closest("#booking-page")) {
    calendar = document.getElementById("booking-date");
    // fixes the bug of calendar input being in local time
    // but Date uses UTC time and so they will clash and change day back
    calendarParse = new Date(`${calendar.value}T00:00:00`);
    updateRoomsHTML(localData, calendarParse);
  }
});

export function bookingPage(date = new Date(startOfToday())) {
  const anchor = document.createElement("div");
  anchor.innerHTML = `
  ${navHTML()}
  <div id="booking-page">
    <hr>
    <div class="filter-container">
      <div>
        <label for="booking-date">Booking Date:</label>
        <input
          type="date"
          id="booking-date"
          value="${format(date, "yyyy-MM-dd")}"
          onclick="this.showPicker()">
      </div>
      <h1>Available Rooms</h1>
      <div class="dropdowns-container">
        <button class="clear-filter-button">Clear filters</button>
        ${dropdownHTML({
          name: "Price",
          callback: priceFilterHTML,
        })}
        ${dropdownHTML({
          name: "Bed #",
          callback: () => roomFilterHTML("numBeds"),
        })}
        ${dropdownHTML({
          name: "Room Type",
          callback: () => roomFilterHTML("roomType"),
        })}
        ${dropdownHTML({
          name: "Bed Size",
          callback: () => roomFilterHTML("bedSize"),
        })}
      </div>
    </div>
    <hr>
    <div class="room-cards-container">
      ${roomCardsHTML(localData, date)}
    </div>
  </div>`;

  return anchor;
}

function roomCardsHTML(data, date) {
  function roomCardHTML(room, date) {
    const bidet = room.bidet
      ? `<li><box-icon name='shower' ></box-icon> has bidet</li>`
      : ``;

    return `
    <section class="room-card" data-number="${room.number}">
      <div class="room-name">Room ${room.number}</div>
      <ul class="room-info">
        <li>
          <box-icon name='home-alt' ></box-icon> ${room.roomType}
        </li>
        ${bidet}
        <li>
          <box-icon name='hotel' type='solid' ></box-icon>
          ${room.numBeds} ${room.bedSize} bed
        </li>
        <li>
          <box-icon name='money' ></box-icon>
           ${room.costPerNight}
        </li>
      </ul>
      ${
        isToday(date) || isFuture(date)
          ? "<button class='book-room-button'>Book</button>"
          : "<br>"
      }
    </section>`;
  }

  let rooms = getAvailableRooms(data, date);
  rooms = parseFilterContainer(rooms);

  return rooms.reduce((html, room) => {
    html += roomCardHTML(room, date) + "<br>";
    return html;
  }, "");
}

function priceFilterHTML() {
  return `
  <div>
    <label for="min-price">Min Price</label>
    <input id="min-price" type="text">
  </div>
  <div>
    <label for="max-price">Max Price</label>
    <input id="max-price" type="text">
  </div>`;
}

function roomFilterHTML(filter) {
  return roomSettings[filter].reduce((html, setting) => {
    const formatted = String(setting).replace(" ", "-");
    html += `
    <div>
      <input 
        id="${formatted}" 
        class="${filter}" 
        type="checkbox"
        value="${setting}"
      >
      <label for="${formatted}">${setting}</label>
    </div>`;
    return html;
  }, "");
}

function updateRoomsHTML(data, date) {
  const roomCardContainer = document.querySelector(".room-cards-container");
  roomCardContainer.innerHTML = `${roomCardsHTML(data, date)}`;
}

function clearFilterContainer() {
  const inputMinPrice = document.querySelector("input#min-price");
  const inputMaxPrice = document.querySelector("input#max-price");
  const allNumBedInputs = document.querySelectorAll("input.numBeds");
  const allRoomTypeInputs = document.querySelectorAll("input.roomType");
  const allBedSizeInputs = document.querySelectorAll("input.bedSize");

  inputMinPrice.value = "";
  inputMaxPrice.value = "";
  allNumBedInputs.forEach((node) => (node.checked = false));
  allRoomTypeInputs.forEach((node) => (node.checked = false));
  allBedSizeInputs.forEach((node) => (node.checked = false));
}

function parseFilterContainer(rooms) {
  function getValues(domArray) {
    return Array.from(domArray).reduce((array, domNode) => {
      if (domNode.checked) {
        array.push(domNode.value);
      }
      return array;
    }, []);
  }

  // price filter
  const inputMinPrice = document.querySelector("input#min-price");
  const inputMaxPrice = document.querySelector("input#max-price");
  // other filters
  const allNumBedInputs = document.querySelectorAll("input.numBeds");
  const allRoomTypeInputs = document.querySelectorAll("input.roomType");
  const allBedSizeInputs = document.querySelectorAll("input.bedSize");

  let [minPrice, maxPrice] = [0, Number.MAX_SAFE_INTEGER];
  if (inputMinPrice && inputMaxPrice) {
    minPrice = parseFloat(inputMinPrice.value) || 0;
    maxPrice = parseFloat(inputMaxPrice.value) || Number.MAX_SAFE_INTEGER;
  }
  rooms = filterRoomsByRange(rooms, { costPerNight: [minPrice, maxPrice] });

  return filterRooms(rooms, {
    numBeds: getValues(allNumBedInputs).map((e) => +e),
    roomType: getValues(allRoomTypeInputs),
    bedSize: getValues(allBedSizeInputs),
  });
}
