const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const CourseSchema = Schema(
  {
    name: { type: String, trim: true },
    schedule: {
      day: { type: String, trim: true },
      time: { type: String, trim: true }
    },
    startDate: { type: String },
    endDate: { type: String }
  },
  { timestamps: true }
);

module.exports = mongosee.model('Course', CourseSchema);
