const fs = require('fs');

const save = function (filename, data) {
  // no file or file exists and its empty
  if (!fs.existsSync(filename) || (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length === 0)) {
    // add the initial array
    fs.writeFileSync(filename, JSON.stringify([])); // , null, 2
  }
  // add the first object
  if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length >= 2) {
    const dbdata = fs.readFileSync(filename, 'utf8');
    const json = JSON.parse(dbdata);
    json.push(data);

    fs.writeFileSync(filename, JSON.stringify(json, null, 2));
  }
  /**
   * TODO: handle checking if object already exists by id,
   * so it doesn't get added again when running multiple times w/o having to delete json file. */
};
const load = function (filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'));
};

const updateEntry = function (filename, id, key, value) {
  const data = this.load(filename);
  const elementIndex = data.findIndex((element) => element.id === id);
  data[elementIndex][key] = value;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

const updateObject = function (filename, id, updatedObj) {
  const data = this.load(filename);
  const elementIndex = data.findIndex((element) => element.id === id);
  data[elementIndex] = updatedObj;
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

module.exports = {
  save, load, updateEntry, updateObject,
};
