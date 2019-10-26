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
  lastname: {
    isEmpty: {
      errorMessage: 'Lastname is required',
      negated: true
    }
  },
  age: {
    isEmpty: {
      errorMessage: 'Age is required',
      negated: true
    },
    isInt: {
      errorMessage: 'Age must be a number'
    }
  },
  email: {
    isEmpty: {
      errorMessage: 'Email is required',
      negated: true
    },
    isEmail: {
      errorMessage: 'Invalid email'
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
