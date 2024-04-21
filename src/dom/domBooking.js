import { format, isFuture, isToday, startOfToday } from "date-fns";
import { setDOM } from "../domUpdates";
import { addBooking, createBooking } from "../js/bookings";
import { getAvailableRooms, getRoom } from "../js/rooms";
import { currentCustomer, localData, roomSettings } from "../scripts";

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target.classList.contains("book-room-button")) {
    const calendar = document.querySelector(".booking-date");

    const roomDOM = e.target.closest(".room-card");
    const roomNumber = +roomDOM.dataset.number;
    const room = getRoom(roomNumber, localData.getRooms());

    // fixes the bug of calendar input being in local time
    // but Date uses UTC time and so they will clash and change day back
    const calendarParse = new Date(`${calendar.value}T00:00:00`);

    const booking = createBooking(
      currentCustomer.id,
      calendarParse,
      room.number
    );

    addBooking(localData, booking).then(() =>
      setDOM(document.getElementById("root"), () => bookingPage(calendarParse))
    );
    // accessibility toggle for keyboard drop down users
    // needs to be dropbtn so only toggles when clicking button
  } else if (e.target.closest(".dropbtn")) {
    const dropdown = e.target.closest(".dropdown");
    const dropButton = dropdown.querySelector(".dropbtn");
    const ariaExpanded = !dropdown.classList.contains("open");

    dropdown.classList.toggle("open");
    dropButton.setAttribute("aria-expanded", ariaExpanded);
  }

  if (e.target.closest(".filter-container")) {
    filterRooms();
  }
});

// event listener for calendar input
document.getElementById("root").addEventListener("change", (e) => {
  if (e.target.classList.contains("booking-date")) {
    const calendar = document.querySelector(".booking-date");
    const calendarParse = new Date(`${calendar.value}T00:00:00`);
    setDOM(e.currentTarget, () => bookingPage(calendarParse));
  }
});

// event listener for dropdown menu WAI-ARIA
document.getElementById("root").addEventListener("mouseover", (e) => {
  const dropdown = e.target.closest(".dropdown");
  if (!dropdown) {
    return;
  }

  dropdown.classList.add("open");
  dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", "true");
});

document.getElementById("root").addEventListener("mouseout", (e) => {
  const dropdown = e.target.closest(".dropdown");
  if (!dropdown) {
    return;
  }

  filterRooms();
  dropdown.classList.remove("open");
  dropdown.querySelector(".dropbtn").setAttribute("aria-expanded", "false");
});

export function bookingPage(date = new Date(startOfToday())) {
  const anchor = document.createElement("div");
  anchor.innerHTML = `
  <h1>Booking Screen</h1>
  <button class="history-button">View history</button>
  <button class="logoff-button">Log off</button>
  
  <hr>
  
  <div>
    <input
      type="date"
      class="booking-date"
      value="${format(date, "yyyy-MM-dd")}"
      onclick="this.showPicker()">
    <div class="filter-container">
      <button>Clear filters</button>
      ${dropdownHTML("Price", priceFilterHTML)}
      ${dropdownHTML("Bed #", () => roomFilterHTML("numBeds"))}
      ${dropdownHTML("Room Type", () => roomFilterHTML("roomType"))}
      ${dropdownHTML("Bed Size", () => roomFilterHTML("bedSize"))}
    </div>
  </div>

  <hr>

  ${availableRoomsHTML(localData, date)}`;

  return anchor;
}

function availableRoomsHTML(data, date) {
  const rooms = getAvailableRooms(data, date);
  return rooms.reduce((html, room) => {
    html += roomCardHTML(room, date) + "<br>";
    return html;
  }, "");
}

function roomCardHTML(room, date) {
  return `
  <section class="room-card" data-number="${room.number}">
    <div class="booking">Room ${room.number}</div>
    <ul>
      <li>Room type: ${room.roomType}</li>
      <li>Has bidet: ${room.bidet}</li>
      <li>Bed size: ${room.bedSize}</li>
      <li>Bed #: ${room.numBeds}</li>
      <li>Price ${room.costPerNight}</li>
    </ul>
    ${bookButtonHTML(date)}
  </section>`;
}

function bookButtonHTML(date) {
  if (isToday(date) || isFuture(date)) {
    return "<button class='book-room-button'>Book Room</button>";
  } else {
    return "<br>";
  }
}

function dropdownHTML(name, callback) {
  return `
  <div class="dropdown">
    <button class="dropbtn" aria-expanded="false">${name}</button>
    <div class="dropdown-content">${callback()}</div>
  </div>`;
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
    // const formattedSetting = String(setting).replace(" ", "-");
    html += `<div>
      <input class="${filter}" type="checkbox" value="${setting}">
      <label>${setting}</label>
    </div>`;
    return html;
  }, "");
}

function filterRooms() {
  // price filter
  const inputMinPrice = document.querySelector("input#min-price");
  const inputMaxPrice = document.querySelector("input#max-price");
  // other filters
  const allNumBedInputs = document.querySelectorAll("input.numBeds");
  const allRoomTypeInputs = document.querySelectorAll("input.roomType");
  const allBedSizeInputs = document.querySelectorAll("input.bedSize");

  console.log(inputMaxPrice.value);
}
