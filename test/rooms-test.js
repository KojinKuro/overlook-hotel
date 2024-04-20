import chai from "chai";
import { createData } from "../src/js/data";
import {
  calculateRevenue,
  filterRooms,
  filterRoomsByRange,
  getAvailableRooms,
  getRoom,
} from "../src/js/rooms";
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
      expect(revenue).to.equal(4433.3);
    });

    it("Should calculate revenue of different bookings", () => {
      const revenue = calculateRevenue(mockBookings.slice(0, 5), mockRooms);
      expect(revenue).to.equal(2162.7);
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

  describe("Filter rooms", () => {
    it("Should filter rooms based on room type", () => {
      const rooms = filterRooms(mockRooms, { roomType: ["single room"] });
      expect(rooms).to.deep.equal([
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

    it("Should filter rooms based on different room type", () => {
      const rooms = filterRooms(mockRooms, {
        roomType: ["residential suite"],
      });
      expect(rooms).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
        },
      ]);
    });

    it("Should filter rooms based on a parameter w/o array", () => {
      const rooms = filterRooms(mockRooms, { roomType: "single room" });
      expect(rooms).to.deep.equal([
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

    it("Should filter rooms based on a different parameter w/o array", () => {
      const rooms = filterRooms(mockRooms, {
        roomType: "residential suite",
      });
      expect(rooms).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
        },
      ]);
    });

    it("Should filter rooms based on bidet true", () => {
      const rooms = filterRooms(mockRooms, {
        bidet: [true],
      });
      expect(rooms).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
        },
      ]);
    });

    it("Should filter rooms based on bidet false", () => {
      const rooms = filterRooms(mockRooms, {
        bidet: [false],
      });
      expect(rooms).to.deep.equal([
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
      ]);
    });

    it("Should filter rooms based on multiple room types", () => {
      const rooms = filterRooms(mockRooms, {
        roomType: ["single room", "suite"],
      });
      expect(rooms).to.deep.equal([
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
      ]);
    });

    it("Should filter rooms based on different multiple room types", () => {
      const rooms = filterRooms(mockRooms, {
        roomType: ["residential suite", "suite"],
      });
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
      ]);
    });

    it("Should filter with multiple parameters", () => {
      const rooms = filterRooms(mockRooms, {
        bidet: [true],
        roomType: ["suite"],
      });
      expect(rooms).to.deep.equal([]);
    });

    it("Should filter with different multiple parameters", () => {
      const rooms = filterRooms(mockRooms, {
        bidet: [true],
        bedSize: ["queen"],
      });
      expect(rooms).to.deep.equal([
        {
          number: 1,
          roomType: "residential suite",
          bidet: true,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 358.4,
        },
      ]);
    });
  });

  describe("Filter rooms by range", () => {
    it("should filter room by price range", () => {
      const rooms = filterRoomsByRange(mockRooms, {
        costPerNight: [300, 450],
      });
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
          number: 4,
          roomType: "single room",
          bidet: false,
          bedSize: "queen",
          numBeds: 1,
          costPerNight: 429.44,
        },
      ]);
    });

    it("should filter room by a different price range", () => {
      const rooms = filterRoomsByRange(mockRooms, {
        costPerNight: [450, 500],
      });
      expect(rooms).to.deep.equal([
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

    it("should filter room by incorrectly ordered price range", () => {
      const rooms = filterRoomsByRange(mockRooms, {
        costPerNight: [450, 420],
      });
      expect(rooms).to.deep.equal([
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

    it("should filter room by incorrectly ordered price range", () => {
      const rooms = filterRoomsByRange(mockRooms, {
        costPerNight: [500, 450],
      });
      expect(rooms).to.deep.equal([
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

    it("should filter room by bed range", () => {
      const rooms = filterRoomsByRange(mockRooms, { numBeds: [1, 2] });
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

    it("should filter room by different bed range", () => {
      const rooms = filterRoomsByRange(mockRooms, { numBeds: [2, 4] });
      expect(rooms).to.deep.equal([
        {
          number: 2,
          roomType: "suite",
          bidet: false,
          bedSize: "full",
          numBeds: 2,
          costPerNight: 477.38,
        },
      ]);
    });

    it.skip("should filter room by price and bed range", () => {});
    it.skip("should filter room by different price and bed range", () => {});
    it.skip("Should not filter if not a number", () => {});
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
