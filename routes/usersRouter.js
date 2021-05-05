const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validateRegistration = require('../middlewares/validateRegistration');

router.get('/', usersController.showLoginPage);
router.get('/:id', usersController.showProfilePage);
router.post('/',  usersController.create);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
