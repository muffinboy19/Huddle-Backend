const mongoose = require('mongoose');
const User = require('./user.models.js');

const communitySchema = new mongoose.Schema({
  communityId: {
    type: String,
    unique: true,
    required: [true, "Community ID is required"],
  },
  communityName: {
    type: String,
    required: [true, "Community name is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enterCode: {
    type: String,
    required: [true, "Enter code is required"],
    unique: true,
  },
  members: [{
    user: {
      type: String,
      ref: 'User', // Reference to the User model
      required: true
    },
    role: {
      type: String,
      default: "member"
    }
  }]
});

module.exports = mongoose.model("Community", communitySchema);
