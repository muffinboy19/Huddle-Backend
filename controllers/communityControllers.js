const { v4: uuidv4 } = require('uuid');
// Function to handle joining a community (same name as route handler)
const Community = require('../models/community.models'); // Adjust the path as needed
const User = require('../models/user.models');
const mongoose = require('mongoose'); // Adjust the path as needed


// Function to handle creating a new community (same name as route handler)
async function createCommunity(req, res) {
  try {
    const {  communityName , enterCode, creatorUserId } = req.body; // Assuming you have both in the request body

    // Validate presence of required fields (adjust as needed)
    if (!communityName || !enterCode || !creatorUserId) {
      throw new Error("Community name, enter code, and creator user ID are required");
    }

    // Generate a unique 17-character community ID
    const communityId = uuidv4().replace(/-/g, '').substring(0, 17); // Remove dashes and truncate to 17 characters

    const newCommunity = new Community({
      communityId, // Add the generated ID
      communityName,
      enterCode,
      members: [{ user: creatorUserId, role: "Owner" }], // Add creator as first member (admin)
    });

    const savedCommunity = await newCommunity.save();
    res.json(savedCommunity);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || "Error creating community" }); // Provide more specific error message if available
  }
}



async function joinCommunity(req, res) {
  try {
    const { communityId, enterCode, userId, role } = req.body;

    // Find the community by ID
    const community = await Community.findOne({ communityId });

    if (!community) {
      throw new Error("Community not found");
    }

    // Verify enter code
    if (community.enterCode !== enterCode) {
      throw new Error("Invalid enter code");
    }

    // Check if the user already exists in the community
    const existingMember = community.members.find(member => member.user === userId);
    if (existingMember) {
      throw new Error("User already exists in the community");
    }

    // Create the new member object
    const newMember = {
      user: userId, // Assign the userId to the user field
      role: role || 'member' // Default to 'member' if role is not provided
    };

    // Add the new member to the community
    community.members.push(newMember);

    // Save the updated community document
    await community.save();

    console.log("User added successfully!");

    res.json({ message: "Joined community successfully!" });
  } catch (err) {
    console.error(err);
    let message = "Error joining community";
    if (err.message === "Community not found") {
      message = "Community not found";
    } else if (err.message === "Invalid enter code") {
      message = "Invalid enter code";
    } else if (err.message === "User already exists in the community") {
      message = "User already exists";
    }
    res.status(400).json({ message });
  }
}


const getAllCommunities = async (req, res) => {
  console.log("getAllCommunities called");

  try {
      const communities = await Community.find();
      console.log("Communities found:", communities);
      res.status(200).json(communities);
  } catch (error) {
      console.error("Error getting all communities:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCommunity,
  joinCommunity,
  getAllCommunities
};
