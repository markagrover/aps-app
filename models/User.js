const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.promise = global.promise;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
