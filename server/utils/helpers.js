const moment = require('moment');

function formatError({ msg }) {
  return `${msg}`;
}

function isValidDate(date) {
  const dateMoment = moment(date, 'MM-DD-YYYY', true);
  return (
    dateMoment.isValid() &&
    dateMoment.isAfter(moment().subtract(1, 'days'), 'days')
  );
}

function isGreaterThan(greater, lower) {
  return moment(greater).isAfter(lower);
}

module.exports = {
  formatError,
  isValidDate,
  isGreaterThan
};
