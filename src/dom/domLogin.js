import { setDOM } from "../js/domUpdates";
import { login } from "../js/login";
import { localData } from "../scripts";
import { bookingScreen } from "./domBooking";

addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("login-button")) {
    const user = document.getElementById("username");
    const pass = document.getElementById("password");
    if (login(user.value, pass.value, localData)) {
      setDOM(document.querySelector("#root"), bookingScreen);
    } else {
      const loginError = document.querySelector(".login-error");
      loginError.innerText = "Error";
    }
  }
});

addEventListener("input", (e) => {
  if (e.target.id === "username" || e.target.id === "password") {
    const loginError = document.querySelector(".login-error");
    loginError.innerText = "";
  }
});

export function loginScreen() {
  return `
  <div>
    <div>Overlook Hotel</div>
    <div>Your New Favorite Stay</div>
  </div>
  <div>
    <form>
      <label for="username">User</label>
      <input type="text" name="username" id="username">
      <label for="password">Pass</label>
      <input type="password" name="password" id="password">
      <div class="login-error"></div>
      <button class="login-button">Log in</button>
    </form>
  </div>
  `;
}