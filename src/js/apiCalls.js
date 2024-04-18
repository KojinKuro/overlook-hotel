import { setBookings, setCustomers, setRooms } from "./data";

function getData(name) {
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then((r) => {
      if (!r.ok) {
        throw Error(`Could not fetch ${name}`);
      }
      return r.json();
    })
    .then((data) => data[name])
    .catch((error) => console.log(error));
}

export function getAllData() {
  return Promise.all([
    getData("customers"),
    getData("rooms"),
    getData("bookings"),
  ]).then(([customers, rooms, bookings]) => {
    setCustomers(customers);
    setRooms(rooms);
    setBookings(bookings);
  });
}

export { getData };
