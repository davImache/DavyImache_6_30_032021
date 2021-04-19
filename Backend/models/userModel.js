const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  //userId: { type: String, required: true},
  email: { type: String, required: true, validate: [isEmail], unique: true },
  password: { type: String, required: true, max: 12, minlength: 6 },
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("user", userSchema);
