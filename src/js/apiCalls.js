import { localData } from "./data";

function getData(name) {
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then((r) => {
      if (!r.ok) {
        throw Error(`Could not fetch ${name}`);
      }
      return r.json();
    })
    .then((data) => data[name])
    .catch((error) => console.log(error));
}

function getAllData() {
  return Promise.all([
    getData("customers"),
    getData("rooms"),
    getData("bookings"),
  ]).then((values) => {
    localData.setAllData(...values);
  });
}

function pushData(name, data) {
  return fetch(`http://localhost:3001/api/v1/${name}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { getAllData, getData, pushData };
