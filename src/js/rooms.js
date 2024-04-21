import { isSameDay } from "date-fns";
import { filterBookings } from "./bookings";

function isRoom(rooms, roomNumber) {
  return Boolean(rooms.find((room) => room.number === roomNumber));
}

function createRoomsFromBookings(bookings, rooms) {
  return bookings.map((booking) =>
    rooms.find((room) => room.number === booking.roomNumber)
  );
}

function generateRoomOptions(rooms, roomProperties = Object.keys(rooms[0])) {
  const settings = rooms.reduce((list, room) => {
    roomProperties.forEach((property) => {
      if (!list[property]) {
        list[property] = [];
      }
      if (!list[property].includes(room[property])) {
        list[property].push(room[property]);
      }
    });
    return list;
  }, {});

  for (const setting in settings) {
    if (typeof settings[setting][0] === "number") {
      settings[setting] = settings[setting].sort((a, b) => a - b);
    }
  }

  return settings;
}

function getRoom(id, rooms) {
  return rooms.find((room) => room.number === id);
}

function getAvailableRooms(data, date) {
  const roomsFull = filterBookings(data.getBookings(), (booking) =>
    isSameDay(booking.date, date)
  ).map((booking) => booking.roomNumber);

  return data.getRooms().filter((room) => !roomsFull.includes(room.number));
}

function calculateRevenue(bookings, rooms) {
  return +createRoomsFromBookings(bookings, rooms)
    .reduce((total, room) => (total += room.costPerNight), 0)
    .toFixed(2);
}

function filterRooms(rooms, options = {}) {
  const filters = Object.keys(options);

  return filters.reduce((filteredRooms, filter) => {
    filteredRooms = filteredRooms.filter((room) => {
      if (!Array.isArray(options[filter])) {
        return options[filter] === room[filter];
      } else {
        return options[filter].includes(room[filter]);
      }
    });
    return filteredRooms;
  }, rooms);
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
  generateRoomOptions,
  getAvailableRooms,
  getRoom,
  isRoom,
};
