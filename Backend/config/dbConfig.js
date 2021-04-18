//Etablir la connexion avec MongoDb
const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://" + process.env.DB_USER +":"+ process.env.DB_PASS +
      "@cluster0.y8eu7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

  
module.exports = mongoose;