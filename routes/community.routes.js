const express = require('express');
const { createCommunity,joinCommunity, getAllCommunities } = require('../controllers/communityControllers'); // Replace with your path
const isAuthorized = require("../middlewares/isAuthorised.middleware"); // Replace with your path

const router = express.Router();

// Create a new community (requires authorization)
router.post('/communities', isAuthorized, createCommunity);

// Join a community using enter code (requires authorization)
router.post('/communities/join', isAuthorized, joinCommunity);

router.get('/communities', getAllCommunities);


module.exports = router;
