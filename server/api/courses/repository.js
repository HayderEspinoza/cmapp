const baseRepository = require('../base.repository');
const courseModel = require('./model');

class courseRepository extends baseRepository {
  constructor(props) {
    super(props);
  }

  getModel() {
    return courseModel;
  }
}

module.exports = new courseRepository();
