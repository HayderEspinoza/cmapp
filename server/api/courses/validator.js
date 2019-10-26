const { checkSchema } = require('express-validator');
const { weekDays } = require('../../utils/constants');
const { isValidDate, isGreaterThan } = require('../../utils/helpers');

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
      options: time => {
        if (Number.isInteger(time) && time <= 24 && time > 0)
          return Promise.resolve();
        return Promise.reject();
      }
    }
  },
  startDate: {
    errorMessage: 'Invalid date',
    custom: {
      options: date =>
        isValidDate(date) ? Promise.resolve() : Promise.reject()
    }
  },
  endDate: {
    errorMessage: 'Invalid date',
    custom: {
      options: (date, { req }) => {
        if (isValidDate(date) && isGreaterThan(date, req.body.startDate)) {
          return Promise.resolve();
        } else return Promise.reject();
      }
    }
  }
};

const validator = option => {
  switch (option) {
    case 'store': {
      return [checkSchema(validations)];
    }
    case 'update': {
      return [checkSchema(validations)];
    }
    default:
      return [];
  }
};

module.exports = validator;
