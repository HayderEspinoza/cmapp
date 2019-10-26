const { validationResult } = require('express-validator');
const courseRepo = require('./repository');
const { formatError } = require('../../utils/helpers');
const { messages } = require('../../utils/constants');

async function index(req, res) {
  try {
    const courses = await courseRepo.find();
    return res.status(200).send(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}

async function store(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(409)
        .send({ errors: errors.formatWith(formatError).mapped() });
    else {
      const course = await courseRepo.save(req.body);
      return res.status(201).send({ message: messages.stored, course });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function update(req, res) {
  const {
    params: { id: courseId },
    body
  } = req;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(409)
        .send({ errors: errors.formatWith(formatError).mapped() });
    else {
      const course = await courseRepo.updateById(courseId, body);
      if (course) return res.status(200).send({ message: messages.updated });
      return res.status(404).send({ message: messages.notExist });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function remove(req, res) {
  try {
    const {
      params: { id: courseId }
    } = req;

    const course = await courseRepo.removeById(courseId);

    if (course) return res.status(200).send({ message: messages.deleted });
    return res.status(404).send({ message: messages.notExist });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = {
  index,
  store,
  update,
  remove
};
