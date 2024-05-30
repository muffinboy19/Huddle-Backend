const express = require('express');
const {uploadSkill, updateProfile, getProfile,getAllUsers} = require('../controllers/userControllers');
const isAuthorized = require("../middlewares/isAuthorised.middleware");
const router = express.Router();

router.post("/uploadSkill", isAuthorized, uploadSkill);
router.put("/updateProfile", isAuthorized, updateProfile);
router.post("/getProfile", isAuthorized, getProfile);
router.get("/getAllUsers", getAllUsers);

module.exports = router;
