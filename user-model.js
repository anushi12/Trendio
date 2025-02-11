 const mongoose = require("mongoose");

 const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio:{
    type: String,
  },
  profilePic:{
    type: String,
    default: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
  },
  public_id:{
    type: String,
  }, 
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],

  threads: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
  replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
  reposts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}]
 }, { timestamps : true });

 module.exports = mongoose.model("user", userSchema);