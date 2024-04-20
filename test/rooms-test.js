import chai from "chai";
import { createData } from "../src/js/data";
import { calculateRevenue } from "../src/js/rooms";
import { mockBookings, mockCustomers, mockRooms } from "./mockData";
const expect = chai.expect;

describe("Rooms", () => {
  let mockData;

  beforeEach(() => {
    mockData = createData(mockCustomers, mockRooms, mockBookings);
  });

  it("Should calculate revenue of bookings", () => {
    const revenue = calculateRevenue(mockBookings, mockRooms);
    expect(revenue).to.equal("$4433.30");
  });

  it("Should calculate revenue of different bookings", () => {
    const revenue = calculateRevenue(mockBookings.splice(0, 5), mockRooms);
    expect(revenue).to.equal("$2162.70");
  });
});
