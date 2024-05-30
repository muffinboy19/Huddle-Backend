const express = require('express');
const { createCommunity,joinCommunity, getAllCommunities } = require('../controllers/communityControllers'); // Replace with your path
const isAuthorized = require("../middlewares/isAuthorised.middleware"); // Replace with your path

const router = express.Router();

// Create a new community (requires authorization)
router.post('/communities', isAuthorized, createCommunity);

// Join a community using enter code (requires authorization)
router.post('/communities/join', isAuthorized, joinCommunity);

router.get('/communities', (req, res, next) => {
    console.log("GET /communities request received");

    try {
        getAllCommunities(req, res);
    } catch (error) {
        console.error("Error in getAllCommunities:", error);
        next(error); // Pass the error to the error handling middleware
    }
});


module.exports = router;
