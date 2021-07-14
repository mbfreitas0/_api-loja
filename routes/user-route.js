const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user-controller');

router.post('/', userController.createUser);
router.post('/login', userController.Login);
router.post('/cadastro', userController.createUser);

module.exports = router;