class baseRepository {
  constructor() {
    this.model = this.getModel();
  }

  getModel() {
    throw new Error('You have to implement the method getModel!');
  }

  findById(id) {
    return this.model.findById(id);
  }

  updateById(id, data) {
    return this.model.findOneAndUpdate({ _id: id }, data);
  }

  removeById(id) {
    return this.model.findOneAndRemove({ _id: id });
  }

  save(data) {
    const model = new this.model(data);
    return model.save();
  }

  findOne(query = {}, fields) {
    return this.model.findOne(query, fields);
  }

  find(query = {}) {
    return this.model.find(query);
  }
}

module.exports = baseRepository;
