module.exports = class Service {
  constructor(model) {
    this.model = model;
  }

  async add(item) {
    return this.model.create(item);
  }

  async deleteOne(id) {
    return this.model.deleteOne(id);
  }

  async find(id) {
    return this.model.findOne(id);
  }

  async findAll(query) {
    return this.model.find(query);
  }

  async updateOne(id, options) {
    return this.model.findOneAndUpdate(id, options, { new: true, useFindAndModify: false });
  }
};
