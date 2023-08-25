import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    reqired: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    min: 7,
  },
});

const UserCollection = mongoose.model("User", UserSchema);
export default UserCollection;
