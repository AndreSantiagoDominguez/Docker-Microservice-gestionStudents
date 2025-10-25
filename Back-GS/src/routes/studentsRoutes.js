const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const { studentValidation } = require('../middlewares/validator');

router.get('/', StudentController.getAll);

router.get('/stats', StudentController.getStats);

router.get('/:id', StudentController.getById);

router.post('/', studentValidation.create, StudentController.create);

router.put('/:id', studentValidation.update, StudentController.update);

router.delete('/:id', StudentController.delete);

module.exports = router;