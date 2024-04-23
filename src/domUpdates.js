import { bookingPage } from "./dom/domBooking";
import { historyPage } from "./dom/domHistory";
import { loginPage } from "./dom/domLogin";

const warningContainer = document.querySelector(".warning-container");

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

function displayWarning(options = {}) {
  const icon = options.icon || "error";
  const message = options.message || "";
  const backgroundColor = options.border || "white";
  const color = options.color || "red";

  const warning = document.createElement("div");
  warning.className = "warning";
  warning.style.color = color;
  warning.style.border = `1px solid ${color}`;
  warning.style.backgroundColor = backgroundColor;
  warning.innerHTML = `
  <box-icon name='${icon}' color='${color}'type='solid' ></box-icon>
  <div>${message}</div>`;

  warningContainer.append(warning);

  setTimeout(() => {
    warningContainer.querySelector("*").remove();
  }, 3000);
}

export { appendDOM, displayWarning, setDOM };
