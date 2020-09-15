const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', userCtrl.getOneUser);
router.get('/users', userCtrl.getAllUsers);
router.put('/user/:id', userCtrl.modifyUser);
router.get('/activate_user/:id', userCtrl.activateUser);

module.exports = router;