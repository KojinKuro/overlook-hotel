import chai from "chai";
import {
  createBooking,
  getCustomerBookings,
  isValidBooking,
  sortBookings,
} from "../src/js/bookings";
import { createData } from "../src/js/data";
import { mockBookings, mockCustomers, mockRooms } from "./mockData";

const expect = chai.expect;

describe("Bookings", () => {
  let mockData;

  beforeEach(() => {
    mockData = createData(mockCustomers, mockRooms, mockBookings);
  });

  describe("Create booking", () => {
    it("should be able to create a booking", () => {
      const userID = 48;
      const date = new Date(2019, 8, 23);
      const roomNumber = 4;

      const booking = createBooking(userID, date, roomNumber);

      expect(booking).to.deep.equal({
        userID: 48,
        date: "2019/09/23",
        roomNumber: 4,
      });
    });

    it("should be able to create another booking", () => {
      const userID = 12;
      const date = new Date(123, 0, 24);
      const roomNumber = 10;

      const booking = createBooking(userID, date, roomNumber);

      expect(booking).to.deep.equal({
        userID: 12,
        date: "0123/01/24",
        roomNumber: 10,
      });
    });

    it("should be able to create booking from strings", () => {
      const userID = "12";
      const date = new Date(123, 0, 24);
      const roomNumber = "10";

      const booking = createBooking(userID, date, roomNumber);

      expect(booking).to.deep.equal({
        userID: 12,
        date: "0123/01/24",
        roomNumber: 10,
      });
    });
  });

  describe("Validate bookings", () => {
    it("should be able to add booking", () => {
      const result = isValidBooking(
        mockData,
        createBooking(40, new Date(2022, 3, 22), 4)
      );
      expect(result).to.deep.equal(true);
    });

    it("should be able to add another booking", () => {
      const result = isValidBooking(
        mockData,
        createBooking(12, new Date(2024, 3, 22), 3)
      );
      expect(result).to.deep.equal(true);
    });

    it("should not add bookings if not valid user", () => {
      expect(() =>
        isValidBooking(mockData, createBooking(190, new Date(2024, 3, 22), 3))
      ).to.throw("Is not a valid customer ID");
    });

    it("should not add bookings if not valid room", () => {
      expect(() =>
        isValidBooking(mockData, createBooking(12, new Date(2024, 3, 22), 10))
      ).to.throw("Is not a valid room number");
    });

    it("should not add bookings if already booked", () => {
      expect(() =>
        isValidBooking(mockData, createBooking(40, new Date(2023, 10, 30), 4))
      ).to.throw("Already contains booking");
    });
  });

  describe("Sort bookings", () => {
    it("Should sort bookings by date in ascending order", () => {
      const bookings = sortBookings(mockBookings.slice(0, 3), true);
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6t6",
          userID: 13,
          date: "2022/01/10",
          roomNumber: 2,
        },
        {
          id: "5fwrgu4i7k55hl6t5",
          userID: 21,
          date: "2022/01/24",
          roomNumber: 1,
        },
        {
          id: "5fwrgu4i7k55hl6sz",
          userID: 40,
          date: "2022/04/22",
          roomNumber: 1,
        },
      ]);
    });

    it("Should sort more bookings by date in ascending order", () => {
      const bookings = sortBookings(mockBookings.slice(-3), true);
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6td",
          userID: 21,
          date: "2022/01/31",
          roomNumber: 4,
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
      ]);
    });

    it("should have the second parameter default to ascending", () => {
      const bookings = sortBookings(mockBookings.slice(2, 4));
      expect(bookings).to.deep.equal([
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
      ]);
    });

    it("Should sort bookings by date in descending order", () => {
      const bookings = sortBookings(mockBookings.slice(0, 3), false);
      expect(bookings).to.deep.equal([
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
      ]);
    });

    it("Should sort more bookings by date in descending order", () => {
      const bookings = sortBookings(mockBookings.slice(-3), false);
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6tc",
          userID: 40,
          date: "2023/11/30",
          roomNumber: 4,
        },
        {
          id: "5fwrgu4i7k55hl6tb",
          userID: 12,
          date: "2022/02/06",
          roomNumber: 4,
        },
        {
          id: "5fwrgu4i7k55hl6td",
          userID: 21,
          date: "2022/01/31",
          roomNumber: 4,
        },
      ]);
    });
  });

  describe("Get customer bookings", () => {
    it("should get bookings from a user with ID", () => {
      const bookings = getCustomerBookings(21, mockData);
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6t5",
          userID: 21,
          date: "2022/01/24",
          roomNumber: 1,
        },
        {
          id: "5fwrgu4i7k55hl6t9",
          userID: 21,
          date: "2023/12/14",
          roomNumber: 3,
        },
        {
          id: "5fwrgu4i7k55hl6td",
          userID: 21,
          date: "2022/01/31",
          roomNumber: 4,
        },
      ]);
    });

    it("should get bookings from another user with ID", () => {
      const bookings = getCustomerBookings(12, mockData);
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6t7",
          userID: 12,
          date: "2022/02/16",
          roomNumber: 2,
        },
        {
          id: "5fwrgu4i7k55hl6tb",
          userID: 12,
          date: "2022/02/06",
          roomNumber: 4,
        },
      ]);
    });

    it("should return an empty array if no bookings", () => {
      const bookings = getCustomerBookings(42, mockData);
      expect(bookings).to.deep.equal([]);
    });

    it("should return undefined if no user ID", () => {
      const bookings = getCustomerBookings(18, mockData);
      expect(bookings).to.deep.equal(undefined);
    });
  });
});
