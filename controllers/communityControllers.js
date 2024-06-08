const Community = require('../models/community.models');
const User = require('../models/user.models');
const { response_200, response_400, response_500 } = require('../utils/responseCodes.utils');

async function commmunityExists(res, communityName, enterCode) {
  if (communityName != "") {
    let exists = await Community.findOne({ communityName: communityName }).exec();
    if (exists) {
      return exists;
    }
  }
  if (enterCode != "") {
    let exists2 = await Community.findOne({ enterCode: enterCode }).exec();
    if (exists2) {
      return exists2;
    }
  }
  return false;
}

async function userExistsinCommunity(community, userId){
  for(let i = 0; i < community.members.length; i++){
    if(community.members[i].user.equals(userId)){
      return true;
    }
  }
  return false;
}

async function updateUserCommunity(communityId, userId){
  console.log(userId);
  console.log(communityId);
  const user = await User.findById(userId);
  console.log(user);
  user.communities.push(communityId);
  await User.findByIdAndUpdate(userId, user);
}

async function createCommunity(req, res) {
  try {
    const { communityName, enterCode, userId } = req.body;

    if (!communityName || !enterCode || !userId) {
      return response_400(res, "Community name, enter code, and creator user ID are required");
    }

    const exists = await commmunityExists(res, communityName, enterCode);

    if (!exists) {
      const newCommunity = new Community({
        communityName,
        enterCode,
        members: [{ user: userId, role: "Owner" },],
      });

      const savedCommunity = await newCommunity.save();

      await updateUserCommunity(savedCommunity._id, userId);

      return response_200(res, savedCommunity);
    }
    else {
      return response_400(res, "Community already exists!");
    }
  } catch (err) {
    console.error(err);
    return response_400(res, err);
  }
}

async function joinCommunity(req, res) {
  try {
    const { enterCode, userId } = req.body;

    const exists = await commmunityExists(res, "", enterCode);

    if (exists) {
      const existance = await userExistsinCommunity(exists, userId); 
      if(existance){
        return response_400(res, "User already exists in community");
      }

      const newMember = {
        user: userId,
        role: 'member'
      };

      exists.members.push(newMember);

      const updatedCommunity = await Community.findOneAndUpdate({enterCode: exists.enterCode}, exists, {new: true})

      await updateUserCommunity(updatedCommunity._id, userId);

      response_200(res, updatedCommunity);
    }
    else{
      return response_400(res, "Community does not exist.");
    }
  }
  catch (err) {
    console.error(err);
    let message = "Error joining community";
    if (err.message === "Community not found") {
      message = "Community not found";
    } else if (err.message === "Invalid enter code") {
      message = "Invalid enter code";
    } else if (err.message === "User already exists in the community") {
      message = "User already exists";
    }
    response_400(res, err);
  }
}


const getAllCommunities = async (req, res) => {
  console.log("getAllCommunities called");

  try {
    const communities = await Community.find();
    console.log("Communities found:", communities);
    response_200(res, communities);
  } catch (error) {
    console.error("Error getting all communities:", error);
    response_500(res, error);
  }
};

module.exports = {
  createCommunity,
  joinCommunity,
  getAllCommunities
};
