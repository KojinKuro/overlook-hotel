import { setDOM } from "../js/domUpdates";
import { bookingPage } from "./domBooking";
import { loginPage } from "./domLogin";

addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("logoff-button")) {
    setDOM(document.querySelector("#root"), loginPage);
  } else if (e.target.classList.contains("booking-button")) {
    setDOM(document.querySelector("#root"), bookingPage);
  }
});

export function historyPage() {
  return `
  <h1>History</h1>
  <button class="booking-button">Return to bookings</button>
  <button class="logoff-button">Log off</button>
  `;
}
