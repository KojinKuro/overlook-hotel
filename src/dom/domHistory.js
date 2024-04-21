import { setDOM } from "../js/domUpdates";
import { bookingScreen } from "./domBooking";
import { loginScreen } from "./domLogin";

addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("logoff-button")) {
    setDOM(document.querySelector("#root"), loginScreen);
  } else if (e.target.classList.contains("booking-button")) {
    setDOM(document.querySelector("#root"), bookingScreen);
  }
});

export function historyScreen() {
  return `
  <h1>History</h1>
  <button class="booking-button">Return to bookings</button>
  <button class="logoff-button">Log off</button>
  `;
}
