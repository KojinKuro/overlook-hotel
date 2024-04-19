function createData(customers = [], rooms = [], bookings = []) {
  let customersData = customers;
  let roomsData = rooms;
  let bookingsData = bookings;

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
    customers: customersData,
    rooms: roomsData,
    bookings: bookingsData,
    setCustomers,
    setRooms,
    setBookings,
    setAllData,
  };
}

const localData = createData();

export { createData, localData };
