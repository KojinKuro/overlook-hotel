import { setDOM } from "../domUpdates";
import {
  filterBookings,
  getCustomerBookings,
  sortBookings,
} from "../js/bookings";
import { getRoom } from "../js/rooms";
import {
  currentCustomer,
  futureDate,
  localData,
  pastDate,
  todayDate,
} from "../scripts";

let bookingFilter = "all";

document.getElementById("root").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.closest(".booking-nav-container")) {
    if (e.target.classList.contains("all-booking-button")) {
      bookingFilter = "all";
    } else if (e.target.classList.contains("past-booking-button")) {
      bookingFilter = "past";
    } else if (e.target.classList.contains("future-booking-button")) {
      bookingFilter = "future";
    }
    setDOM(e.currentTarget, historyPage);
  }
});

export function historyPage() {
  return `
  <h1>History</h1>
  <nav>
    <button class="booking-button">Return to bookings</button>
    <button class="logoff-button">Log off</button>
  </nav>
  <hr>
  <div>
    <nav class="booking-nav-container">
      <button class="all-booking-button">All Bookings</button>
      <button class="past-booking-button">Past Bookings</button>
      <button class="future-booking-button">Future Bookings</button>
    </nav>
    <hr>
    <div>
      ${usersBookingHTML(currentCustomer.id, bookingFilter, localData)}
    </div>
  </div>
  `;
}

function usersBookingHTML(id, filter, data) {
  let bookings = getCustomerBookings(id, data);
  let min, max, sortAscending;
  switch (filter) {
    case "all":
      min = pastDate;
      max = futureDate;
      sortAscending = false;
      break;
    case "past":
      min = pastDate;
      max = todayDate;
      sortAscending = false;
      break;
    case "future":
      min = todayDate;
      max = futureDate;
      sortAscending = true;
      break;
  }

  bookings = filterBookings(bookings, min, max);
  bookings = sortBookings(bookings, sortAscending);

  return bookings.reduce((html, booking) => {
    html += bookingHistoryCardHTML(booking, data.getRooms());
    html += "<br>";
    return html;
  }, "");
}

function bookingHistoryCardHTML(booking, rooms) {
  const room = getRoom(booking.roomNumber, rooms);
  return `
  <section>
    <div>
      <div class="booking-date">Booking date: ${booking.date}</div>
      <div class="booking">Room ${room.number}</div>
    </div>
    <div>Room type: ${room.roomType}</div>
    <div>Has bidet: ${room.bidet}</div>
    <div>Bed size: ${room.bedSize}</div>
    <div>Bed #: ${room.numBeds}</div>
    <div>Price ${room.costPerNight}</div>
  </section>`;
}
