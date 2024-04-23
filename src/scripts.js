// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "boxicons";
import "normalize.css";
import "./css/booking.scss";
import "./css/history.scss";
import "./css/login.scss";
import "./css/styles.scss";

import "./images/error.png";
import "./images/junior-suite.jpg";
import "./images/login.jpg";
import "./images/residential-suite.jpg";
import "./images/single-room.jpg";
import "./images/suite.jpg";

import { loginPage } from "./dom/domLogin";
import { displayWarning, setDOM } from "./domUpdates";
import { getAllData } from "./js/apiCalls";
import { createData } from "./js/data";
import { generateRoomOptions } from "./js/rooms";

// global data
export const localData = createData();
export let currentCustomer = null;
export let roomSettings = null;
// used for debugging what currentCustomer is
// run `user()` in console to run
global.user = () => currentCustomer;

addEventListener("load", init);

function setCustomer(value) {
  currentCustomer = value;
}

function init() {
  getAllData(localData)
    .then(() => {
      roomSettings = generateRoomOptions(localData.getRooms(), [
        "numBeds",
        "roomType",
        "bedSize",
      ]);

      // auto set currentCustomer
      // setCustomer(getCustomer(localData.getCustomers(), 20));
      setDOM(document.querySelector("#root"), loginPage);
    })
    .catch((error) => displayWarning({ message: error }));
}

export { setCustomer };
