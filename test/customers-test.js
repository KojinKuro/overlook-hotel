import chai from "chai";
import { getCustomer } from "../src/js/customers";
import { mockCustomers } from "./mockData";
const expect = chai.expect;

describe("Customer", () => {
  describe("Get customer", () => {
    it("should get a customer based on id", () => {
      const customer = getCustomer(mockCustomers, 40);
      expect(customer).to.deep.equal({
        id: 40,
        name: "Leatha Ullrich",
      });
    });

    it("should get a customer based on a different id", () => {
      const customer = getCustomer(mockCustomers, 21);
      expect(customer).to.deep.equal({
        id: 21,
        name: "Rocio Schuster",
      });
    });

    it("should return undefined if cannot find", () => {
      const customer = getCustomer(mockCustomers, 30);
      expect(customer).to.equal(undefined);
    });
  });
});
