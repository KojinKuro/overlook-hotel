import { bookingPage } from "./domBooking";
import { historyPage } from "./domHistory";
import { loginPage } from "./domLogin";

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target.classList.contains("logoff-button")) {
    setDOM(document.querySelector("#root"), loginPage);
  } else if (e.target.classList.contains("booking-button")) {
    setDOM(document.querySelector("#root"), bookingPage);
  } else if (e.target.classList.contains("history-button")) {
    setDOM(document.querySelector("#root"), historyPage);
  }
});

function setDOM(element, html) {
  element.innerHTML = html();
}

function appendDOM(element, html) {
  element.append(html());
}

export { appendDOM, setDOM };
