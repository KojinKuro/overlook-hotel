import { filterBookings } from "./bookings";

function isRoom(rooms, roomNumber) {
  return Boolean(rooms.find((room) => room.number === roomNumber));
}

function createRoomsFromBookings(bookings, rooms) {
  return bookings.map((booking) =>
    rooms.find((room) => room.number === booking.roomNumber)
  );
}

function getRoom(id, rooms) {
  return rooms.find((room) => room.number === id);
}

function getAvailableRooms(data, date) {
  const roomsFull = filterBookings(data.getBookings(), date).map(
    (booking) => booking.roomNumber
  );

  return data.getRooms().filter((room) => !roomsFull.includes(room.number));
}

function calculateRevenue(bookings, rooms) {
  const revenue = createRoomsFromBookings(bookings, rooms)
    .reduce((total, room) => (total += room.costPerNight), 0)
    .toFixed(2);

  return `$${revenue}`;
}

export { calculateRevenue, getAvailableRooms, getRoom, isRoom };
