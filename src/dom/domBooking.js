import { format, isFuture, isToday, startOfToday } from "date-fns";
import { setDOM } from "../domUpdates";
import { addBooking, createBooking } from "../js/bookings";
import { getAvailableRooms, getRoom } from "../js/rooms";
import { currentCustomer, localData, roomSettings } from "../scripts";

document.getElementById("root").addEventListener("click", (e) => {
  const filterModal = document.querySelector(".filter-modal");
  if (e.target.classList.contains("filter-modal-open")) {
    filterModal.showModal();
  } else if (e.target.classList.contains("filter-modal-close")) {
    filterModal.close();
  } else if (e.target.classList.contains("book-room-button")) {
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
  }
});

document.getElementById("root").addEventListener("change", (e) => {
  if (e.target.classList.contains("booking-date")) {
    const calendar = document.querySelector(".booking-date");
    const calendarParse = new Date(`${calendar.value}T00:00:00`);
    setDOM(e.currentTarget, () => bookingPage(calendarParse));
  }
});

export function bookingPage(date = new Date(startOfToday())) {
  const anchor = document.createElement("div");
  anchor.innerHTML = `
  <h1>Booking Screen</h1>
  <button class="history-button">View history</button>
  <button class="logoff-button">Log off</button>
  
  <hr>
  
  <input 
    type="date" 
    class="booking-date" 
    value="${format(date, "yyyy-MM-dd")}"
    onclick="this.showPicker()">

  <button>Clear filters</button>
  <div class="dropdown">
    <button class="dropbtn">Price</button>
    <div class="dropdown-content">${priceFilterHTML()}</div>
  </div>
  <div class="dropdown">
    <button class="dropbtn">Bed #</button>
    <div class="dropdown-content">${bedNumberFilterHTML()}</div>
  </div>
  <div class="dropdown">
    <button class="dropbtn">Room Type</button>
    <div class="dropdown-content">${roomTypeFilterHTML()}</div>
  </div>
  <div class="dropdown">
    <button class="dropbtn">Bed Size</button>
    <div class="dropdown-content">${bedSizeFilterHTML()}</div>
  </div>

  <hr>

  ${availableRoomsHTML(localData, date)}`;

  return anchor;
}

function availableRoomsHTML(data, date) {
  const rooms = getAvailableRooms(data, date);
  return rooms.reduce((html, room) => {
    html += roomCardHTML(room, date);
    return html;
  }, "");
}

function roomCardHTML(room, date) {
  return `
  <section class="room-card" data-number="${room.number}">
    <div class="booking">Room ${room.number}</div>
    <div>Room type: ${room.roomType}</div>
    <div>Has bidet: ${room.bidet}</div>
    <div>Bed size: ${room.bedSize}</div>
    <div>Bed #: ${room.numBeds}</div>
    <div>Price ${room.costPerNight}</div>
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

function priceFilterHTML() {
  return `
  <div>
    <div>Price Range</div>
    <label>Min Price</label>
    <input type="text">
    <label>Max Price</label>
    <input type="text">
  </div>`;
}

function bedNumberFilterHTML() {
  return `
  <div>
  ${roomSettings.numBeds.reduce((html, setting) => {
    html += `
    <div>
      <input name='${setting}-bed' type="checkbox">
      <label for='${setting}-bed'>${setting}</label>
    </div>`;
    return html;
  }, "")}
  </div>`;
}

function roomTypeFilterHTML() {
  return `
  <div>
  ${roomSettings.roomType.reduce((html, setting) => {
    const formattedSetting = setting.replace(" ", "-");
    html += `
    <div>
      <input name='${formattedSetting}' type="checkbox">
      <label for='${formattedSetting}'>${setting}</label>
    </div>`;
    return html;
  }, "")}
  </div>`;
}

function bedSizeFilterHTML() {
  return `
  <div>
  ${roomSettings.bedSize.reduce((html, setting) => {
    html += `
    <div>
      <input name='${setting}' type="checkbox">
      <label for='${setting}'>${setting}</label>
    </div>`;
    return html;
  }, "")}
  </div>`;
}
