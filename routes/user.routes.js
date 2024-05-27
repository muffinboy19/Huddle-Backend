const express = require('express');
const {uploadSkill, updateProfile, getProfile} = require('../controllers/userControllers');
const router = express.Router();

router.post("/uploadSkill", uploadSkill);
router.put("/updateProfile", updateProfile);
router.post("/getProfile", getProfile);

module.exports = router;
