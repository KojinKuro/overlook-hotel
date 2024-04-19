import { format } from "date-fns";

function createBooking(userID, date, roomNumber) {
  return {
    userID,
    date: format(date, "yyyy/MM/dd"),
    roomNumber,
  };
}

function filterBookings(data, property, query, endQuery = query) {
  return data.getBookings().reduce((list, booking) => {
    switch (property) {
      case "date":
        if (
          new Date(booking[property]).getTime() >= query.getTime() &&
          new Date(booking[property]).getTime() <= endQuery.getTime()
        ) {
          list.push(booking);
        }
        break;
      default:
        if (booking[property] >= query && booking[property] <= endQuery) {
          list.push(booking);
        }
        break;
    }
    return list;
  }, []);
}

export { createBooking, filterBookings };
