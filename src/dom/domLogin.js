import { setDOM } from "../domUpdates";
import { login } from "../js/login";
import { currentCustomer, localData, setCustomer } from "../scripts";
import { bookingPage } from "./domBooking";

addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("login-button")) {
    const user = document.getElementById("username");
    const pass = document.getElementById("password");
    const customer = login(user.value, pass.value, localData);

    if (customer) {
      setCustomer(customer);
      setDOM(document.querySelector("#root"), bookingPage);
      console.log(currentCustomer);
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

export function loginPage() {
  setCustomer(null);

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
