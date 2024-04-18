function login(username, password, customersData) {
  const id = getUsernameID(username);
  if (
    !id ||
    !customersData.find((customer) => customer.id === id) ||
    password !== "overlook2021"
  ) {
    return false;
  }

  return true;
}

function getUsernameID(username) {
  const idIndex = username.indexOf("customer") + "customer".length;
  return +username.slice(idIndex);
}

export { login };
