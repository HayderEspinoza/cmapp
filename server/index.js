require('dotenv').config({ overwrite: true });
const database = require('./utils/database');
const app = require('./app');
const { PORT } = process.env;

database
  .connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
