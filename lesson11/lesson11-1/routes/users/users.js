const express = require("express");
const router = express.Router();
// const {} = require('../users/validationUser');
const {
  registration,
  login,
  logout,
  uploadAvatar,
  verifyUser,
  repeatEmailForVerifyUser,
} = require("../../controllers/users");
const guard = require("../../helpers/guard");
const loginLimit = require("../../helpers/rate-limit-login");
const upload = require("../../helpers/uploads");
const wrapError = require("../../helpers/errorHandler");

router.post("/registration", registration);
router.post("/login", loginLimit, login);
router.post("/logout", guard, logout);
router.patch("/avatar", guard, upload.single("avatar"), uploadAvatar);

router.get("/verify/:token", wrapError(verifyUser));
router.post("/verify", wrapError(repeatEmailForVerifyUser));

module.exports = router;
