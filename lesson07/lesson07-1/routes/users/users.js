const express = require("express");
const router = express.Router();
// const {} = require('../users/validationUser');
const { registration, login, logout } = require("../../controllers/users");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
