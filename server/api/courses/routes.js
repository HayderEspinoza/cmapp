const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.get('/', controller.index);
router.post('/', validator('store'), controller.store);
router.put('/:id', validator('update'), controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
