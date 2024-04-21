function createData(customers = [], rooms = [], bookings = []) {
  let customersData = JSON.parse(JSON.stringify(customers));
  let roomsData = JSON.parse(JSON.stringify(rooms));
  let bookingsData = JSON.parse(JSON.stringify(bookings));

  function getCustomers() {
    return customersData;
  }

  function getRooms() {
    return roomsData;
  }

  function getBookings() {
    return bookingsData;
  }

  function setAllData(customers, rooms, bookings) {
    customersData = JSON.parse(JSON.stringify(customers));
    roomsData = JSON.parse(JSON.stringify(rooms));
    bookingsData = JSON.parse(JSON.stringify(bookings));
  }

  function setCustomers(value) {
    customersData = JSON.parse(JSON.stringify(value));
  }

  function setRooms(value) {
    roomsData = JSON.parse(JSON.stringify(value));
  }

  function setBookings(value) {
    bookingsData = JSON.parse(JSON.stringify(value));
  }

  return {
    getCustomers,
    getBookings,
    getRooms,
    setCustomers,
    setRooms,
    setBookings,
    setAllData,
  };
}

export { createData };
