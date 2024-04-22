import { bookingPage } from "./dom/domBooking";
import { historyPage } from "./dom/domHistory";
import { loginPage } from "./dom/domLogin";

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target.classList.contains("logoff-button")) {
    setDOM(e.currentTarget, loginPage);
  } else if (e.target.classList.contains("booking-button")) {
    setDOM(e.currentTarget, bookingPage);
  } else if (e.target.classList.contains("history-button")) {
    setDOM(e.currentTarget, historyPage);
  }
});

function setDOM(element, html) {
  element.innerHTML = "";
  appendDOM(element, html);
}

function appendDOM(element, html) {
  element.append(html());
}

export { appendDOM, setDOM };
