const mongoose = require('mongoose');
const { MONGO_URL } = process.env;

async function connect() {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  };

  mongoose.connect(MONGO_URL, options);
  mongoose.connection.on('error', error => console.log(error));
  mongoose.connection.once('open', () => {
    console.log('Connected to the database');
  });
  return mongoose.connection;
}

module.exports = { connect };
