const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Community name is required"],
    unique: true, // Ensures each community has a unique name
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default to current date
  },
  enterCode: {
    type: String,
    required: [true, "Enter code is required"],
    unique: true, // Ensures each community has a unique enter code
  },
  // Removed members array (if not needed)
});


module.exports = mongoose.model("Community", communitySchema);
