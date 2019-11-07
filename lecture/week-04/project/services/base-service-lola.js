const fs = require('fs');
const Flatted = require('flatted/cjs');

module.exports = class Service {
  constructor(model, dbPath) {
    this.model = model;
    this.dbPath = dbPath;
  }

  async findAll() {
    return new Promise((resolve, reject) => {
      // read file async fxn
      fs.readFile(this.dbPath, 'utf8', async (err, contents) => {
        // pass callback as third param
        // template:
        // async (err, contents) => {
        // if (err) {
        // return reject (err)
        // }
        // resolve (contents)
        // }
        if (err) {
          if (err.code === 'ENOENT') {
            await this.saveAll([]);
            return resolve([]);
          }
          return reject(err);
        }
        const array = Flatted.parse(contents);
        let items = null;
        if (array.length > 1) {
          items = array.map(this.model.create);
        } else {
          items = [];
          // console.log(items);
        }
        // const items = JSON.parse(contents).map(this.model.create);
        resolve(items);
      });
    });
  }

  async find(id) {
    const elements = await this.findAll();
    return elements.find((element) => element.id === id);
  }

  async updateObject(updatedObj) {
    const elements = await this.findAll();
    const elementIndex = elements.findIndex((element) => element.id === updatedObj.id);
    elements[elementIndex] = updatedObj;
    await this.saveAll(elements);
  }

  async addObject(obj) {
    const json = await this.findAll();
    json.push(obj);
    await this.saveAll(json);
  }

  // my save all fxn
  // async saveAll(array) {
  //   return new Promise((resolve, reject) => {
  //     fs.writeFile(this.dbPath, Flatted.stringify(array, null, 2), (err, contents) => {
  //       if (err) return reject(err);
  //       resolve();
  //     });
  //   });
  // }

  async saveAll(people) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.dbPath, Flatted.stringify(people), (err, file) => {
        if (err) return reject(err);

        resolve();
      });
    });
  }

  // my save function
  // async save(obj) {
  //   const filename = this.dbPath;
  //   // no file exists or file exists and it's empty
  //   // if (!fs.existsSync(filename) || (fs.existsSync(filename) && await this.findAll().length === 0)) {
  //   if (!fs.existsSync(filename) || (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length === 0)) {
  //     // add the initial array
  //     await this.saveAll([]);
  //   }
  //   // add the first object
  //   // if (fs.existsSync(filename) && await this.findAll().length === 2) {
  //   if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length === 2) {
  //     await this.addObject(obj);
  //     // if more than one object exists
  //   } else if (fs.existsSync(filename) && fs.readFileSync(filename, 'utf8').length > 2) {
  //     // check if object exists by id and update otherwise just add
  //     await this.updateOrSave(obj);
  //   }

  //   Promise.resolve(obj);
  // }

  async add(item) {
    const allItems = await this.findAll();
    // const lastItem = allItems[allItems.length - 1];
    // const lastItemsId = lastItem && lastItem.id || 0;
    // item.id = lastItemsId + 1;

    allItems.push(item);

    await this.saveAll(allItems);

    return item;
  }

  async updateOrSave(obj) {
    const objId = await this.find(obj.id);
    if (objId === undefined) {
      await this.addObject(obj);
    } else {
      await this.updateObject(obj);
    }
    return obj;
  }

  async deleteObj(obj) {
    const elements = await this.findAll();
    const elementIndex = elements.findIndex((element) => element.id === obj.id);
    if (elementIndex < 0) return;
    elements.array.splice(elementIndex, 1);
    await this.saveAll(elements);
  }
};
