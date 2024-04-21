// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "normalize.css";
import "./css/styles.scss";
import "./images/turing-logo.png";
import "./js/domUpdates";

import { loginScreen } from "./dom/domLogin";
import { getAllData } from "./js/apiCalls";
import { createData } from "./js/data";
import { setDOM } from "./js/domUpdates";

// global data
export const localData = createData();

addEventListener("load", init);

function init() {
  console.log("init");
  getAllData(localData).then(() => {
    console.log("customers", localData.getCustomers());
    console.log("rooms", localData.getRooms());
    console.log("bookings", localData.getBookings());
  });

  setDOM(document.querySelector("#root"), loginScreen);
}
