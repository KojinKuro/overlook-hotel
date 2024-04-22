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
      loginError.innerText = "No matching username & password combination ";
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
    <div class="login-title">Overlook Hotel</div>
    <div class="login-slogan">Your New Favorite Stay</div>
  </div>
  <div>
    <form class="login-form">
      <div>
        <h1>Login</h1>
      </div>
      <label for="username">
        <div>Username</div>
        <input type="text" name="username" id="username">
      </label>
      <label for="password">
        <div>Password</div>
        <input type="password" name="password" id="password">
      </label>
      <div>
        <div class="login-error"></div>
        <button class="login-button">Log in</button>
      </div>
    </form>
  </div>`;
  return anchor;
}
