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
  return +createRoomsFromBookings(bookings, rooms)
    .reduce((total, room) => (total += room.costPerNight), 0)
    .toFixed(2);
}

function filterRooms(rooms, options = {}) {
  const filters = Object.keys(options);
  let filteredRooms = rooms;

  filters.forEach((filter) => {
    filteredRooms = filteredRooms.filter((room) => {
      if (!Array.isArray(options[filter])) {
        return options[filter] === room[filter];
      }
      return options[filter].includes(room[filter]);
    });
  });

  return filteredRooms;
}

function filterRoomsByRange(rooms, options = {}) {
  const filters = Object.keys(options);

  return filters.reduce((filteredRooms, filter) => {
    let filterMin, filterMax;
    if (options[filter][0] >= options[filter][1]) {
      filterMin = options[filter][1];
      filterMax = options[filter][0];
    } else {
      filterMin = options[filter][0];
      filterMax = options[filter][1];
    }

    return filteredRooms.filter(
      (room) => room[filter] >= filterMin && room[filter] <= filterMax
    );
  }, rooms);
}

export {
  calculateRevenue,
  filterRooms,
  filterRoomsByRange,
  getAvailableRooms,
  getRoom,
  isRoom,
};
