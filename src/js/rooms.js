function isRoom(rooms, roomNumber) {
  return Boolean(rooms.find((room) => room.number === roomNumber));
}

function createRoomsFromBookings(bookings, rooms) {
  return bookings.map((booking) =>
    rooms.find((room) => room.number === booking.roomNumber)
  );
}

function calculateRevenue(bookings, rooms) {
  const revenue = createRoomsFromBookings(bookings, rooms)
    .reduce((total, room) => (total += room.costPerNight), 0)
    .toFixed(2);

  return `$${revenue}`;
}

export { calculateRevenue, isRoom };
