//Importer mongoose
const mongoose = require("mongoose");

//Crétion de notre Model pour les sauces
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0, required: true },
  dislikes: { type: Number, default: 0, required: true },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },
});

//Exporter le modèle sauceSchema 
module.exports = mongoose.model("sauce", sauceSchema);
