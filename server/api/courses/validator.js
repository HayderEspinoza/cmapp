const { checkSchema } = require('express-validator');
const { weekDays } = require('../../utils/constants');
const { isValidDate, isGreaterThan } = require('../../utils/helpers');
const studentRepo = require('./../courses/repository');
const courseRepo = require('./repository');

const validations = {
  name: {
    isEmpty: {
      errorMessage: 'Name is required',
      negated: true
    }
  },
  'schedule.day': {
    isEmpty: {
      errorMessage: 'Day is required',
      negated: true
    },
    isIn: {
      options: [weekDays]
    }
  },
  'schedule.time': {
    isEmpty: {
      errorMessage: 'Time is required',
      negated: true
    },
    custom: {
      errorMessage: 'Time must be greater than 0 and lower than 24',
      options: time => Number.isInteger(time) && time <= 24 && time > 0
    }
  },
  startDate: {
    errorMessage: 'Format not valid',
    custom: {
      options: date => isValidDate(date)
    }
  },
  endDate: {
    errorMessage: 'Format not valid',
    custom: {
      options: (date, { req }) =>
        isValidDate(date) && isGreaterThan(date, req.body.startDate)
    }
  }
};

const storeStudent = {
  courseId: {
    isEmpty: {
      errorMessage: 'Course field is required',
      negated: true
    },
    custom: {
      errorMessage: 'Course does not exist',
      options: async courseId => {
        const course = await courseRepo.findById(courseId);
        if (!course) throw new Error();
        return true;
      }
    }
  },
  studentId: {
    isEmpty: {
      errorMessage: 'Student field is required',
      negated: true
    },
    custom: {
      errorMessage: 'Student already exist in this course ',
      options: async (studentId, { req }) => {
        const { courseId } = req.body;
        const exist = await courseRepo.findOne({
          _id: courseId,
          students: studentId
        });
        if (exist) throw new Error();
        return true;
      }
    }
  }
};

const removeStudent = {
  courseId: {
    isEmpty: {
      errorMessage: 'Course field is required',
      negated: true
    },
    custom: {
      errorMessage: 'Course does not exist',
      options: async courseId => {
        const course = await courseRepo.findById(courseId);
        if (!course) throw new Error();
        return true;
      }
    }
  },
  studentId: {
    isEmpty: {
      errorMessage: 'Student field is required',
      negated: true
    },
    custom: {
      errorMessage: 'Student does not exist in this course',
      options: async (studentId, { req }) => {
        const { courseId } = req.body;
        const exist = await courseRepo.findOne({
          _id: courseId,
          students: studentId
        });
        if (exist) return true;
        throw new Error();
      }
    }
  }
};

const validator = option => {
  switch (option) {
    case 'store':
      return [checkSchema(validations)];
    case 'update':
      return [checkSchema(validations)];
    case 'storeStudent':
      return [checkSchema(storeStudent)];
    case 'removeStudent':
      return [checkSchema(removeStudent)];
    default:
      return [];
  }
};

module.exports = validator;
