import { format } from "date-fns";

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

export { createBooking, filterBookings };
