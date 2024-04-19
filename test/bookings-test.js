import chai from "chai";
import { addBooking, createBooking, filterBookings } from "../src/js/bookings";
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
  });

  describe("Add bookings", () => {
    it("should be able to add booking", () => {
      addBooking(mockData, createBooking(40, new Date(2022, 3, 22), 4));
    });

    it("should be able to add another booking", () => {
      addBooking(mockData, createBooking(12, new Date(2024, 3, 22), 3));
    });
  });

  describe("Filter bookings", () => {
    it("Should filter based on date", () => {
      const bookings = filterBookings(
        mockData.getBookings(),
        new Date(2023, 11, 14)
      );
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6t9",
          userID: 21,
          date: "2023/12/14",
          roomNumber: 3,
        },
      ]);
    });

    it("Should filter by another date", () => {
      const bookings = filterBookings(
        mockData.getBookings(),
        new Date(2023, 10, 30)
      );
      expect(bookings).to.deep.equal([
        {
          id: "5fwrgu4i7k55hl6tc",
          userID: 40,
          date: "2023/11/30",
          roomNumber: 4,
        },
      ]);
    });

    it("Should filter by a range of dates", () => {
      const bookings = filterBookings(
        mockData.getBookings(),
        new Date(2022, 0, 1),
        new Date(2022, 4, 1)
      );

      expect(bookings).to.deep.equal([
        {
          date: "2022/04/22",
          id: "5fwrgu4i7k55hl6sz",
          roomNumber: 1,
          userID: 40,
        },
        {
          date: "2022/01/24",
          id: "5fwrgu4i7k55hl6t5",
          roomNumber: 1,
          userID: 21,
        },
        {
          date: "2022/01/10",
          id: "5fwrgu4i7k55hl6t6",
          roomNumber: 2,
          userID: 13,
        },
        {
          date: "2022/02/16",
          id: "5fwrgu4i7k55hl6t7",
          roomNumber: 2,
          userID: 12,
        },
        {
          date: "2022/02/05",
          id: "5fwrgu4i7k55hl6t8",
          roomNumber: 3,
          userID: 40,
        },
        {
          date: "2022/01/11",
          id: "5fwrgu4i7k55hl6ta",
          roomNumber: 3,
          userID: 13,
        },
        {
          date: "2022/02/06",
          id: "5fwrgu4i7k55hl6tb",
          roomNumber: 4,
          userID: 12,
        },
        {
          date: "2022/01/31",
          id: "5fwrgu4i7k55hl6td",
          roomNumber: 4,
          userID: 21,
        },
      ]);
    });

    it("Should filter by a range of dates", () => {
      const bookings = filterBookings(
        mockData.getBookings(),
        new Date(2023, 0, 1),
        new Date(2024, 0, 1)
      );

      expect(bookings).to.deep.equal([
        {
          date: "2023/12/14",
          id: "5fwrgu4i7k55hl6t9",
          roomNumber: 3,
          userID: 21,
        },
        {
          date: "2023/11/30",
          id: "5fwrgu4i7k55hl6tc",
          roomNumber: 4,
          userID: 40,
        },
      ]);
    });
  });
});
