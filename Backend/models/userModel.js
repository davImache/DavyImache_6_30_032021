//Importer mongoose
const mongoose = require("mongoose");

//Importer mongoose unique validator
const mongooseUniqueValidator = require("mongoose-unique-validator");

//Importer validator
const { isEmail } = require("validator");

//Crétion de notre Model pour les données utilisateurs
const userSchema = mongoose.Schema({
  //userId: { type: String, required: true},
  email: { type: String, required: true, validate: [isEmail], unique: true },
  password: { type: String, required: true, max: 12, minlength: 6 },
});

//Appliquer le plugin unique sur notre userSchema
userSchema.plugin(mongooseUniqueValidator);

//Exporter le modèle sauceSchema
module.exports = mongoose.model("user", userSchema);
