import { setDOM } from "../js/domUpdates";
import { historyPage } from "./domHistory";
import { loginPage } from "./domLogin";

addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("logoff-button")) {
    setDOM(document.querySelector("#root"), loginPage);
  } else if (e.target.classList.contains("history-button")) {
    setDOM(document.querySelector("#root"), historyPage);
  }
});

export function bookingPage() {
  return `
  <h1>Booking Screen</h1>
  <button class="history-button">View history</button>
  <button class="logoff-button">Log off</button>
  `;
}
