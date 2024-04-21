function isCustomer(customers, customerID) {
  return Boolean(getCustomer(customers, customerID));
}

function getCustomer(customers, customerID) {
  return customers.find((customer) => customer.id === customerID);
}

export { getCustomer, isCustomer };
