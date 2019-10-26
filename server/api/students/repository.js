const baseRepository = require('../base.repository');
const studentModel = require('./model');

class studentRepository extends baseRepository {
  constructor(props) {
    super(props);
  }

  getModel() {
    return studentModel;
  }
}

module.exports = new studentRepository();
