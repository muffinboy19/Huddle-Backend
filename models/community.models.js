const mongoose = require('mongoose');
const User = require('./user.models.js');

const communitySchema = new mongoose.Schema({
  __created: {
    type:Date,
    default: Date.now,
  },
  communityName: {
    type: String,
    required: [true, "Community name is required"],
  },
  enterCode: {
    type: String,
    required: [true, "Enter code is required"],
  },
  members: [
  {
    user: {
      type: mongoose.Schema.ObjectId,
    },
    role: {
      type: String,
      default: "member"
    },
  },
  ],
});

module.exports = mongoose.model("Community", communitySchema);
