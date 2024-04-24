import { compareAsc, compareDesc, format } from "date-fns";
import { isCustomer } from "./customers";
import { isRoom } from "./rooms";

function createBooking(userID, date, roomNumber) {
  return {
    userID: parseInt(userID),
    date: format(date, "yyyy/MM/dd"),
    roomNumber: parseInt(roomNumber),
  };
}

function getCustomerBookings(userID, data) {
  if (!isCustomer(data.getCustomers(), userID)) {
    return;
  }
  return data.getBookings().filter((booking) => booking.userID === userID);
}

function filterBookings(bookings, filterCallback) {
  return bookings.reduce((list, booking) => {
    if (filterCallback(booking)) {
      list.push(booking);
    }
    return list;
  }, []);
}

function isValidBooking(data, booking) {
  if (!isCustomer(data.getCustomers(), booking.userID)) {
    throw Error("Is not a valid customer ID");
  } else if (!isRoom(data.getRooms(), booking.roomNumber)) {
    throw Error("Is not a valid room number");
  } else if (containsBooking(data.getBookings(), booking)) {
    throw Error("Already contains booking");
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

function findBookingIndex(bookings, bookingID) {
  return bookings.findIndex((booking) => booking.id === bookingID);
}

function sortBookings(bookings, ascending = true) {
  const sortAlgorithm = ascending ? compareAsc : compareDesc;
  return bookings.sort((booking1, booking2) =>
    sortAlgorithm(booking1.date, booking2.date)
  );
}

export {
  containsBooking,
  createBooking,
  filterBookings,
  findBookingIndex,
  getCustomerBookings,
  isValidBooking,
  sortBookings,
};
