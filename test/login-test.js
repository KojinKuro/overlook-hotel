import chai from "chai";
import { login } from "../src/js/login";

const expect = chai.expect;

describe("Login", () => {
  const database = [
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

  it("Should login a user", () => {
    const username = "customer40";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(true);
  });

  it("Should not login a user with the wrong password", () => {
    const username = "customer40";
    const password = "wrongpassword";
    expect(login(username, password, database)).to.equal(false);
  });

  it("Should login another user", () => {
    const username = "customer21";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(true);
  });

  it("Should login another user with the wrong password", () => {
    const username = "customer21";
    const password = "wrongpassword";
    expect(login(username, password, database)).to.equal(false);
  });

  it("Should not login a fake user", () => {
    const username = "customer1";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(false);
  });

  it("Should not login another fake user", () => {
    const username = "customer13";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(false);
  });

  it("Should not login yet another fake user", () => {
    const username = "billybob";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(false);
  });

  it("Should not login yet another fake user again", () => {
    const username = "someonecrazy";
    const password = "overlook2021";
    expect(login(username, password, database)).to.equal(false);
  });
});
