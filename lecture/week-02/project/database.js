const fs = require('fs');

function load(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

function getById(id, elements) {
  return elements.find((element) => element.id === id);
}

function updateEntry(filename, id, key, value) {
  const data = this.load(filename);
  const elementIndex = data.findIndex((element) => element.id === id);
  data[elementIndex][key] = value;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function updateObject(filename, id, updatedObj) {
  const data = load(filename);
  const elementIndex = data.findIndex((element) => element.id === id);
  data[elementIndex] = updatedObj;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function save(filename, data) {
  // no file or file exists and its empty
  if (!fs.existsSync(filename) || (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length === 0)) {
    // add the initial array
    fs.writeFileSync(filename, JSON.stringify([])); // , null, 2
  }

  // add the first object
  if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length === 2) {
    const json = load(filename);
    json.push(data);
    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  // if more than one object exists
  } else if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length > 2) {
    // check if object exists by id update otherwise just add
    const json = load(filename);
    if (getById(data.id, json) === undefined) {
      json.push(data);
      fs.writeFileSync(filename, JSON.stringify(json, null, 2));
    } else {
      updateObject(filename, data.id, data);
    }
  }
}

module.exports = {
  load, getById, updateEntry, updateObject, save,
};
