import { setDOM } from "../js/domUpdates";
import { historyScreen } from "./domHistory";
import { loginScreen } from "./domLogin";

addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("logoff-button")) {
    setDOM(document.querySelector("#root"), loginScreen);
  } else if (e.target.classList.contains("history-button")) {
    setDOM(document.querySelector("#root"), historyScreen);
  }
});

export function bookingScreen() {
  return `
  <h1>Booking Screen</h1>
  <button class="history-button">View history</button>
  <button class="logoff-button">Log off</button>
  `;
}
