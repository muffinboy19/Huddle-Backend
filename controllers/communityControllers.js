const Community = require("../models/community.models");

// Function to handle creating a new community (same name as route handler)
async function createCommunity(req, res) {
  try {
    const { name, enterCode, username } = req.body;
    const newCommunity = new Community({
      name,
      enterCode,
      username,
    });

    const savedCommunity = await newCommunity.save(); // Save the new community to database
    res.json(savedCommunity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating community" });
  }
}




// Function to handle joining a community (same name as route handler)
async function joinCommunity(req, res) {
  try {
    const { communityId, enterCode } = req.body; // Assuming you have logic to get user ID from authentication

    await joinCommunity(communityId, enterCode);
    res.json({ message: "Joined community successfully!" });
  } catch (err) {
    console.error(err);
    let message = "Error joining community";
    if (err.message === "Community not found") {
      message = "Community not found";
    } else if (err.message === "Invalid enter code") {
      message = "Invalid enter code";
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
