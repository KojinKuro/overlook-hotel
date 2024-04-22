import { compareAsc, compareDesc, format } from "date-fns";
import { deleteData, pushData } from "./apiCalls";
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

function addBooking(data, booking) {
  if (!isValidBooking(data, booking)) {
    console.log("not valid booking for whatever reason");
    return;
  }

  return pushData("bookings", booking).then((d) => {
    console.log(d.message);
    data.getBookings().push(d.newBooking);
  });
}

function removeBooking(data, bookingID) {
  deleteData("bookings", bookingID).then(() => {
    const index = findBooking(data.getBookings(), bookingID);
    data.getBookings().splice(index, 1);
  });
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

function findBooking(bookings, bookingID) {
  return bookings.find((booking) => booking.id === bookingID);
}

function sortBookings(bookings, ascending = true) {
  const sortAlgorithm = ascending ? compareAsc : compareDesc;
  return bookings.sort((booking1, booking2) =>
    sortAlgorithm(booking1.date, booking2.date)
  );
}

export {
  addBooking,
  containsBooking,
  createBooking,
  filterBookings,
  getCustomerBookings,
  isValidBooking,
  removeBooking,
  sortBookings,
};
