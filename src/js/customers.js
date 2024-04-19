function isCustomer(customers, customerID) {
  return Boolean(customers.find((customer) => customer.id === customerID));
}

export { isCustomer };
