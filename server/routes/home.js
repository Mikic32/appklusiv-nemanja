const express = require('express');

const usersController = require('../controllers/users')

const router = express.Router();


router.post("/api/authorize", usersController.postUserName)

router.post("/api/logout", usersController.postLogOutUser)

module.exports = router