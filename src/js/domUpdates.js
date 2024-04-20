import { removeBooking } from "./bookings";
import { localData } from "./data";

const bookingRemoveInput = document.querySelector("#booking-id");
const bookingRemoveButton = document.querySelector(".booking-remove-button");
console.log(bookingRemoveButton);

bookingRemoveButton.addEventListener("click", (e) => {
  e.preventDefault();
  removeBooking(localData, bookingRemoveInput.value);
  console.log("test");
});
