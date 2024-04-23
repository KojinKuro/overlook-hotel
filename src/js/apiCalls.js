import { displayWarning } from "../domUpdates";

function getData(name) {
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then((r) => {
      if (!r.ok) {
        throw Error(`Could not get ${name} data`);
      }
      return r.json();
    })
    .then((data) => data[name])
    .catch((error) => displayWarning({ message: error }));
}

function getAllData(variable) {
  return Promise.all([
    getData("customers"),
    getData("rooms"),
    getData("bookings"),
  ]).then((values) => {
    variable.setAllData(...values);
  });
}

function deleteData(name, id) {
  return fetch(`http://localhost:3001/api/v1/${name}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (!r.ok) {
        throw Error(`${r.status} ${r.statusText}. Failed to delete ${id} `);
      }
      return r.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => displayWarning({ message: error }));
}

function pushData(name, data) {
  return fetch(`http://localhost:3001/api/v1/${name}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (!r.ok) {
        throw Error(`Failed to save ${name} data`);
      }
      return r.json();
    })
    .catch((error) => displayWarning({ message: error }));
}

export { deleteData, getAllData, getData, pushData };
