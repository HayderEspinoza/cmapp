const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const StudentSchema = Schema(
  {
    name: { type: String, trim: true },
    lastname: { type: String, trim: true },
    age: { type: Number },
    email: { type: String },
    courses: { type: Array }
  },
  { timestamps: true }
);

module.exports = mongosee.model('Student', StudentSchema);
