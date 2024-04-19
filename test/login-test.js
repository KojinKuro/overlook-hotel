import chai from "chai";
import { createData } from "../src/js/data";
import { login } from "../src/js/login";
import { mockBookings, mockCustomers, mockRooms } from "./mockData";

const expect = chai.expect;

describe("Login", () => {
  const mockData = createData(mockCustomers, mockRooms, mockBookings);

  it("Should login a user", () => {
    const username = "customer40";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(true);
  });

  it("Should not login a user with the wrong password", () => {
    const username = "customer40";
    const password = "wrongpassword";
    expect(login(username, password, mockData)).to.equal(false);
  });

  it("Should login another user", () => {
    const username = "customer21";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(true);
  });

  it("Should login another user with the wrong password", () => {
    const username = "customer21";
    const password = "wrongpassword";
    expect(login(username, password, mockData)).to.equal(false);
  });

  it("Should not login a fake user", () => {
    const username = "customer1";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(false);
  });

  it("Should not login another fake user", () => {
    const username = "customer19";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(false);
  });

  it("Should not login yet another fake user", () => {
    const username = "billybob";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(false);
  });

  it("Should not login yet another fake user again", () => {
    const username = "someonecrazy";
    const password = "overlook2021";
    expect(login(username, password, mockData)).to.equal(false);
  });
});
