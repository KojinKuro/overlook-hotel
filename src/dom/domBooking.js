import { format, isFuture, isToday } from "date-fns";
import { setDOM } from "../domUpdates";
import { sortBookings } from "../js/bookings";
import { parseDateString } from "../js/date";
import { getAvailableRooms } from "../js/rooms";
import { localData } from "../scripts";

document.getElementById("root").addEventListener("click", (e) => {
  e.preventDefault();

  const filterModal = document.querySelector(".filter-modal");
  if (e.target.classList.contains("filter-modal-open")) {
    filterModal.showModal();
  } else if (e.target.classList.contains("filter-modal-close")) {
    filterModal.close();
  } else if (e.target.classList.contains("get-rooms-button")) {
    const calendar = document.querySelector(".booking-date");
    console.log("today is", calendar.value);

    // parseDateString fixes the bug of calendar input being in local time
    // but Date uses UTC time and so they will clash and change day back
    setDOM(e.currentTarget, () => bookingPage(parseDateString(calendar.value)));
  }
});

export function bookingPage(date = new Date(Date.now())) {
  console.log(sortBookings(localData.getBookings()));

  console.log(`page has been set to ${date}`);

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
  <button class='get-rooms-button'>Get Available Rooms</button>
  <button class='filter-modal-open'>Filter</button>

  <hr>

  <dialog class="filter-modal">
    <button class="filter">Filter</button>
    <button class="filter-modal-close">Close</button>
  </dialog>

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
  <section>
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
