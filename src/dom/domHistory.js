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
  const navContainer = e.target.closest(".booking-nav-container");
  if (navContainer) {
    // const filterButtons = navContainer.querySelectorAll("button");
    // filterButtons.forEach((node) => node.classList.remove("selected"));
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
  <div class="history-container">
    <h1>History</h1>
    <button class="booking-button">
      <box-icon name='arrow-back'></box-icon>
      Return to bookings
    </button>
    <p>This is your booking history of rooms. 
    Please note that you must give 24 hours to cancel any booking.</p>
    <div>
      Total Money Spent: 
      $${calculateRevenue(bookings, rooms).toFixed(2)}
    </div>

    <div class="booking-container">
      <div>
        <nav class="booking-nav-container">
          <div>
            <button class="all-booking-button">
              All Bookings
            </button>
          </div>
          <div>
            <button class="past-booking-button">
              Past Bookings
            </button>
          </div>
          <div>
            <button class="future-booking-button">
              Future Bookings
            </button>
          </div>
        </nav>
        <table class="bookings">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Details</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
          ${usersBookingHTML(currentCustomer.id, bookingFilter, localData)}
        </table>
      </div>
    </div>
  </div>`;

  anchor
    .querySelector(`.${bookingFilter}-booking-button`)
    .classList.add("selected");

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
    html += bookingTableEntryHTML(booking, data.getRooms());
    return html;
  }, "");
}

function bookingTableEntryHTML(booking, rooms) {
  const room = getRoom(booking.roomNumber, rooms);

  return `
  <tr class="booking">
    <td>${booking.id}</td>
    <td>${booking.date}</td>
    <td>
      ROOM ${room.number} / 
      ${room.roomType.toUpperCase()} / 
      ${room.numBeds} ${room.bedSize.toUpperCase()}
    </td>
    <td>${room.costPerNight}</td>
    <td>${
      isFuture(booking.date)
        ? "<button class'cancel-booking-button'>Cancel</button>"
        : ""
    }</td>
  </tr>`;
}
