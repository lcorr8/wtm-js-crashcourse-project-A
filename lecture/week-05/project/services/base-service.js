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
    return this.model.findOne({ _id: id });
  }

  async findAll(query) {
    return this.model.find(query);
  }

  async updateOne(id, update) {
    return this.model.findOneAndUpdate({ _id: id }, update, {
      new: true,
      useFindAndModify: false,
      runValidators: true,
    });
  }
};
