const express = require('express');
const {signup, login, logout, verifyOtp} = require('../controllers/authControllers');
const { isAuthorized } = require("../middlewares/isAuthorised.middleware")
const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-user", isAuthorized, verifyOtp);

module.exports = router;
