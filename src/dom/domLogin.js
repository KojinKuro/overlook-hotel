import { setDOM } from "../domUpdates";
import { login } from "../js/login";
import { currentCustomer, localData, setCustomer } from "../scripts";
import { bookingPage } from "./domBooking";

document.getElementById("root").addEventListener("click", (e) => {
  if (e.target.classList.contains("login-button")) {
    e.preventDefault();

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

document.getElementById("root").addEventListener("input", (e) => {
  if (e.target.id === "username" || e.target.id === "password") {
    const loginError = document.querySelector(".login-error");
    loginError.innerText = "";
  }
});

export function loginPage() {
  setCustomer(null);

  const anchor = document.createElement("div");
  anchor.id = "login-page";
  anchor.innerHTML = `
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
  </div>`;
  return anchor;
}
