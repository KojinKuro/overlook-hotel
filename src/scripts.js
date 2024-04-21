// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "normalize.css";
import "./css/styles.scss";
import "./images/turing-logo.png";
import "./js/domUpdates";

import { historyPage } from "./dom/domHistory";
// import { loginPage } from "./dom/domLogin";
import { getAllData } from "./js/apiCalls";
import { getCustomer } from "./js/customers";
import { createData } from "./js/data";
import { setDOM } from "./js/domUpdates";

// global data
export const localData = createData();
export let currentCustomer = null;
// used for debugging what currentCustomer is
// run `user()` in console to run
global.user = () => currentCustomer;

addEventListener("load", init);

function setCustomer(value) {
  currentCustomer = value;
}

function init() {
  console.log("init");
  getAllData(localData).then(() => {
    console.log("customers", localData.getCustomers());
    console.log("rooms", localData.getRooms());
    console.log("bookings", localData.getBookings());

    // auto set currentCustomer
    setCustomer(getCustomer(localData.getCustomers(), 20));
  });

  // set page current to history for debugging
  setDOM(document.querySelector("#root"), historyPage);
  // setDOM(document.querySelector("#root"), loginPage);
}

export { setCustomer };
