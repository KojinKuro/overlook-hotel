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

document.getElementById("root").addEventListener("click", () => {});

export function historyPage() {
  return `
  <h1>History</h1>
  <nav>
    <button class="booking-button">Return to bookings</button>
    <button class="logoff-button">Log off</button>
  </nav>
  <hr>
  <div>
    <nav>
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
  let min, max;
  switch (filter) {
    case "all":
      min = pastDate;
      max = futureDate;
      break;
    case "past":
      min = pastDate;
      max = todayDate;
      break;
    case "future":
      min = todayDate;
      max = futureDate;
      break;
  }

  bookings = sortBookings(filterBookings(bookings, min, max));
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
