function createData(customers = [], rooms = [], bookings = []) {
  let customersData = customers;
  let roomsData = rooms;
  let bookingsData = bookings;

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
    customersData = customers;
    roomsData = rooms;
    bookingsData = bookings;
  }

  function setCustomers(value) {
    customersData = value;
  }

  function setRooms(value) {
    roomsData = value;
  }

  function setBookings(value) {
    bookingsData = value;
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

const localData = createData();

export { createData, localData };
