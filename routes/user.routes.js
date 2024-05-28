const express = require('express');
const {uploadSkill, updateProfile, getProfile} = require('../controllers/userControllers');
const isAuthorized = require("../middlewares/isAuthorised.middleware");
const router = express.Router();

router.post("/uploadSkill", isAuthorized, uploadSkill);
router.put("/updateProfile", isAuthorized, updateProfile);
router.post("/getProfile", isAuthorized, getProfile);

module.exports = router;
