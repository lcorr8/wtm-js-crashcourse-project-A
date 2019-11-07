module.exports = class Service {
  constructor(model) {
    this.model = model;
  }

  async add(item) {
    return this.model.create(item);
  }

  async delete(id) {
    return this.model.remove({ id });
  }

  async find(id) {
    return this.model.findOne(id);
  }

  async findAll() {
    return this.model.find();
  }

  async updateOne(id, options) {
    return this.model.findOneAndUpdate(id, options, { new: true });
  }
};
