const mockCustomers = [
  {
    id: 40,
    name: "Leatha Ullrich",
  },
  {
    id: 21,
    name: "Rocio Schuster",
  },
  {
    id: 13,
    name: "Kelvin Schiller",
  },
  {
    id: 12,
    name: "Kennedi Emard",
  },
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

const mockBookings = [
  {
    id: "5fwrgu4i7k55hl6sz",
    userID: 40,
    date: "2022/04/22",
    roomNumber: 1,
  },
  {
    id: "5fwrgu4i7k55hl6t5",
    userID: 21,
    date: "2022/01/24",
    roomNumber: 1,
  },
  {
    id: "5fwrgu4i7k55hl6t6",
    userID: 13,
    date: "2022/01/10",
    roomNumber: 2,
  },
  {
    id: "5fwrgu4i7k55hl6t7",
    userID: 12,
    date: "2022/02/16",
    roomNumber: 2,
  },
  {
    id: "5fwrgu4i7k55hl6t8",
    userID: 40,
    date: "2022/02/05",
    roomNumber: 3,
  },
  {
    id: "5fwrgu4i7k55hl6t9",
    userID: 21,
    date: "2023/12/14",
    roomNumber: 3,
  },
  {
    id: "5fwrgu4i7k55hl6ta",
    userID: 13,
    date: "2022/01/11",
    roomNumber: 3,
  },
  {
    id: "5fwrgu4i7k55hl6tb",
    userID: 12,
    date: "2022/02/06",
    roomNumber: 4,
  },
  {
    id: "5fwrgu4i7k55hl6tc",
    userID: 40,
    date: "2023/11/30",
    roomNumber: 4,
  },
  {
    id: "5fwrgu4i7k55hl6td",
    userID: 21,
    date: "2022/01/31",
    roomNumber: 4,
  },
];

export { mockBookings, mockCustomers, mockRooms };
