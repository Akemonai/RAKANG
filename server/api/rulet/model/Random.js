const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomSchema =  new mongoose.Schema({
    uid:{
      type: String
    },
    CNumber: {
      type: String,
    },
    content: {
      type: String,
    },
  }, {timestamps: true});
  
  randomSchema.index({createdAt: 1},{expireAfterSeconds: 43200});
  
  const Random = mongoose.model("Random", randomSchema);
  module.exports = Random;