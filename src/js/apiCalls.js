function getData(name) {
  return fetch(`http://localhost:3001/api/v1/${name}`)
    .then((r) => {
      if (!r.ok) {
        throw Error(`Could not get ${name} data`);
      }
      return r.json();
    })
    .then((data) => data[name])
    .catch((error) => console.log(error));
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
  console.log(id);
  return fetch(`http://localhost:3001/api/v1/${name}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => {
      if (!r.ok) {
        console.log(r);
        throw Error(`Failed to delete ${id} because of ${r}`);
      }
      return r.json();
    })
    .then((data) => {
      console.log(data.message);
    })
    .catch((error) => console.log(error));
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
    .catch((error) => console.log(error));
}

export { deleteData, getAllData, getData, pushData };
