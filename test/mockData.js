import { createBooking } from "../src/js/bookings";

const mockBookings = [
  createBooking(12, new Date(2022, 3, 23), 1),
  createBooking(12, new Date(2022, 0, 24), 1),
  createBooking(40, new Date(2022, 4, 25), 2),
  createBooking(40, new Date(2022, 0, 22), 3),
  createBooking(21, new Date(2022, 3, 22), 4),
  createBooking(21, new Date(2022, 0, 22), 1),
  createBooking(21, new Date(2022, 0, 23), 2),
  createBooking(52, new Date(2022, 4, 24), 4),
  createBooking(52, new Date(2022, 3, 25), 3),
  createBooking(52, new Date(2022, 0, 22), 2),
];

const mockRooms = [
  {
    number: 1,
    roomType: "residential suite",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 358.4,
  },
  {
    number: 2,
    roomType: "suite",
    bidet: false,
    bedSize: "full",
    numBeds: 2,
    costPerNight: 477.38,
  },
  {
    number: 3,
    roomType: "single room",
    bidet: false,
    bedSize: "king",
    numBeds: 1,
    costPerNight: 491.14,
  },
  {
    number: 4,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 429.44,
  },
];

const mockCustomers = [
  {
    id: 12,
    name: "Charles Kwang",
  },
  {
    id: 40,
    name: "Bing Bong",
  },
  {
    id: 21,
    name: "Travis Mavis",
  },
  {
    id: 52,
    name: "Someone's Name",
  },
];

export { mockBookings, mockCustomers, mockRooms };
