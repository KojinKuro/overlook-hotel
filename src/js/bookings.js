import { format } from "date-fns";
import { pushData } from "./apiCalls";
import { isCustomer } from "./customers";
import { isRoom } from "./rooms";

function createBooking(userID, date, roomNumber) {
  return {
    userID,
    date: format(date, "yyyy/MM/dd"),
    roomNumber,
  };
}

function filterBookings(bookings, query, endQuery = query) {
  return bookings.reduce((list, booking) => {
    if (
      new Date(booking.date).getTime() >= query.getTime() &&
      new Date(booking.date).getTime() <= endQuery.getTime()
    ) {
      list.push(booking);
    }
    return list;
  }, []);
}

function addBooking(data, booking) {
  if (isValidBooking(data, booking)) {
    pushData("bookings", booking)
      .then((r) => {
        if (!r.ok) {
          throw Error("Response failed");
        }
        return r.json();
      })
      .then((data) => {
        console.log(data.message);
        data.getBookings().push(data.newBooking);
      })
      .catch((error) => console.log(error));
  } else {
    console.log("not valid booking for whatever reason");
  }
}

function isValidBooking(data, booking) {
  if (
    !isCustomer(data.getCustomers(), booking.userID) ||
    !isRoom(data.getRooms(), booking.roomNumber) ||
    isBooking(data, booking)
  ) {
    return false;
  }
  return true;
}

function isBooking(data, booking) {
  const matchingBookingCount = data
    .getBookings()
    .filter(
      (b) =>
        b.userID === booking.userID &&
        b.date === booking.date &&
        b.roomNumber === booking.roomNumber
    ).length;

  return Boolean(matchingBookingCount);
}

export { addBooking, createBooking, filterBookings, isValidBooking };
