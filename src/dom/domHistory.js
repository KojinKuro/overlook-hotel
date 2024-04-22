import { isFuture, isPast, isToday } from "date-fns";
import { setDOM } from "../domUpdates";
import {
  filterBookings,
  getCustomerBookings,
  sortBookings,
} from "../js/bookings";
import { calculateRevenue, getRoom } from "../js/rooms";
import { currentCustomer, localData } from "../scripts";
import { navHTML } from "./domNav";

let bookingFilter = "all";

document.getElementById("root").addEventListener("click", (e) => {
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
  const bookings = getCustomerBookings(currentCustomer.id, localData);
  const rooms = localData.getRooms();

  const anchor = document.createElement("div");
  anchor.id = "history-page";
  anchor.innerHTML = `
  ${navHTML()}
  <h1>History</h1>

  <button class="booking-button">Return to bookings</button>
  <div>This is your booking history of rooms</div>
  <div>Total Money Spent: $${calculateRevenue(bookings, rooms).toFixed(2)}</div>

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
  </div>`;

  return anchor;
}

function usersBookingHTML(id, filter, data) {
  let bookings = getCustomerBookings(id, data);
  switch (filter) {
    case "all":
      bookings = sortBookings(bookings, false);
      break;
    case "past":
      bookings = filterBookings(
        bookings,
        (booking) => isPast(booking.date) && !isToday(booking.date)
      );
      bookings = sortBookings(bookings, false);
      break;
    case "future":
      bookings = filterBookings(
        bookings,
        (booking) => isToday(booking.date) || isFuture(booking.date)
      );
      bookings = sortBookings(bookings);
      break;
  }

  return bookings.reduce((html, booking) => {
    html += bookingHistoryCardHTML(booking, data.getRooms()) + "<br>";
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
    <ul>
      <li>Room type: ${room.roomType}</li>
      <li>Has bidet: ${room.bidet}</li>
      <li>Bed size: ${room.bedSize}</li>
      <li>Bed #: ${room.numBeds}</li>
      <li>Price ${room.costPerNight}</li>
    </ul>
  </section>`;
}
