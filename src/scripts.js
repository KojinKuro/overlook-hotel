// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "normalize.css";
import "./css/styles.scss";

// An example of how you tell webpack to use an image
// (also need to link to it in the index.html)
import "./images/turing-logo.png";
import { getAllData } from "./js/apiCalls";
import { localData } from "./js/data";

addEventListener("load", init);

function init() {
  console.log("init");
  getAllData().then(() => {
    console.log("customers", localData.getCustomers());
    console.log("rooms", localData.getRooms());
    console.log("bookings", localData.getBookings());
  });
}

console.log("This is the JavaScript entry file - your code begins here.");
