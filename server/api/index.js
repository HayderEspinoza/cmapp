const express = require('express');
const routes = express();

const students = require('./students/routes');
const courses = require('./courses/routes');

routes.use('/students', students);
routes.use('/courses', courses);

module.exports = routes;
