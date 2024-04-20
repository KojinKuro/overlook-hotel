function isRoom(rooms, roomNumber) {
  return Boolean(rooms.find((room) => room.number === roomNumber));
}

function createRoomsFromBookings(data) {
  return data
    .getBookings()
    .map((booking) =>
      data.getRooms().find((room) => room.number === booking.roomNumber)
    );
}

function calculateRevenue(data) {
  const revenue = createRoomsFromBookings(data)
    .reduce((total, room) => (total += room.costPerNight), 0)
    .toFixed(2);

  return `$${revenue}`;
}

export { calculateRevenue, isRoom };
