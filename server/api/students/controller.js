const { validationResult } = require('express-validator');
const studentRepo = require('./repository');
const { formatError } = require('../../utils/helpers');
const { messages } = require('../../utils/constants');

async function index(req, res) {
  try {
    const students = await studentRepo.find();
    return res.status(200).send(students);
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
      const student = await studentRepo.save(req.body);
      return res.status(201).send({ message: messages.stored, student });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function update(req, res) {
  const {
    params: { id: studentId },
    body
  } = req;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res
        .status(409)
        .send({ errors: errors.formatWith(formatError).mapped() });
    else {
      const student = await studentRepo.updateById(studentId, body);
      if (student) return res.status(200).send({ message: messages.updated });
      return res.status(404).send({ message: messages.notExist });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function remove(req, res) {
  try {
    const {
      params: { id: studentId }
    } = req;

    const student = await studentRepo.removeById(studentId);

    if (student) return res.status(200).send({ message: messages.deleted });
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
