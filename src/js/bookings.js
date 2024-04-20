import { format } from "date-fns";
import { deleteData, pushData } from "./apiCalls";
import { isCustomer } from "./customers";
import { isRoom } from "./rooms";

function createBooking(userID, date, roomNumber) {
  return {
    userID,
    date: format(date, "yyyy/MM/dd"),
    roomNumber,
  };
}

// function filterBookings(bookings, query, endQuery = query) {
//   return bookings.reduce((list, booking) => {
//     if (
//       new Date(booking.date).getTime() >= query.getTime() &&
//       new Date(booking.date).getTime() <= endQuery.getTime()
//     ) {
//       list.push(booking);
//     }
//     return list;
//   }, []);
// }

function addBooking(data, booking) {
  if (isValidBooking(data, booking)) {
    pushData("bookings", booking).then((data) => {
      console.log(data.message);
      data.getBookings().push(data.newBooking);
    });
  } else {
    console.log("not valid booking for whatever reason");
  }
}

function removeBooking(data, bookingID) {
  deleteData("bookings", bookingID).then(() => {
    const index = findBooking(data.getBookings(), bookingID);
    data.getBookings().splice(index, 1);
  });
}

function isValidBooking(data, booking) {
  if (
    !isCustomer(data.getCustomers(), booking.userID) ||
    !isRoom(data.getRooms(), booking.roomNumber) ||
    containsBooking(data.getBookings(), booking)
  ) {
    return false;
  }
  return true;
}

function containsBooking(bookings, booking) {
  const matchingBookingCount = bookings.filter(
    (b) =>
      b.userID === booking.userID &&
      b.date === booking.date &&
      b.roomNumber === booking.roomNumber
  ).length;

  return Boolean(matchingBookingCount);
}

function findBooking(bookings, bookingID) {
  return bookings.find((booking) => booking.id === bookingID);
}

export {
  addBooking,
  createBooking,
  // filterBookings,
  isValidBooking,
  removeBooking,
};
