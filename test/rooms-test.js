import chai from "chai";
import { createData } from "../src/js/data";
import { calculateRevenue, getAvailableRooms, getRoom } from "../src/js/rooms";
import { mockBookings, mockCustomers, mockRooms } from "./mockData";
const expect = chai.expect;

describe("Rooms", () => {
  let mockData;

  beforeEach(() => {
    mockData = createData(mockCustomers, mockRooms, mockBookings);
  });

  describe("Calculate Revenue", () => {
    it("Should calculate revenue of bookings", () => {
      const revenue = calculateRevenue(mockBookings, mockRooms);
      expect(revenue).to.equal("$4433.30");
    });

    it("Should calculate revenue of different bookings", () => {
      const revenue = calculateRevenue(mockBookings.slice(0, 5), mockRooms);
      expect(revenue).to.equal("$2162.70");
    });
  });

  describe("Get room", () => {
    it("Should give a room based on id", () => {
      const room = getRoom(1, mockRooms);
      expect(room).to.deep.equal({
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4,
      });
    });

    it("Should give another room based on id", () => {
      const room = getRoom(2, mockRooms);
      expect(room).to.deep.equal({
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38,
      });
    });
  });

  describe("Available rooms", () => {
    it("Should be able to get available rooms on a date", () => {
      const rooms = getAvailableRooms(mockData, new Date(2023, 10, 30));
      expect(rooms).to.deep.equal([
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
      ]);
    });

    it("Should be able to get available rooms on different date", () => {
      const rooms = getAvailableRooms(mockData, new Date(2022, 1, 16));
      expect(rooms).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
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
      ]);
    });
  });
});
