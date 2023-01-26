const express = require('express');

const usersController = require('../controllers/users')

const router = express.Router();

router.post("/api/register", usersController.postRegisterUser)

module.exports = router