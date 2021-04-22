// Importer le package bcrypt
const bcrypt = require("bcrypt");

// Pour la création des tokens 
const jwt = require("jsonwebtoken");

// Importer le modèle de données utilisateur
const User = require("../models/userModel");

/**
 * [signup requête, réponse]
 *
 * @param   {string, number}  req   [mail, mot de  passe]
 * @param   {json}  res   [réponse en json]
 
 * @return  {status 201}   res     [Utilisateur crée]
 * @return  {status 500}   res     [error]
 */
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)//hash du mot de passe et saler 10 fois
    .then((hash) => {
      const user = new User({ email: maskEmail(req.body.email), password: hash });
      user
        .save() //Sauvegarder les données du nouvel utilisateur dans la base de donnée
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/**
 * [login requête, réponse]
 *
 * @param   {string}  req   [compare adress mail]
 * @param   {number}  req   [compare mot de  passe]
 * @param   {json}  res   [json]
 * @param   {status 200.json}  res   [token atrribué à user._id pour 24heures]
 
 * @return  {status 401}   res     [Utilisateut non trouvé]
 * @return  {status 401}   res     [Mot de passe incorrect]
 * @return  {status 500}   res     [error]
 */
exports.login = (req, res, next) => {
  User.findOne({ email: maskEmail(req.body.email) })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password) //Comparaison du mot de passe avec le hash
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            //Attribution d'un TOKEN d'Authentification
            token: jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};


//Pour masquer l'adresse mail dans la base de donnée
const gap = 180;
function maskEmail(email, reveal = false) {
  let newEmail = "";
  let arobase = false;
  for (let i = 0, size = email.length; i < size; i++) {
    if (email[i] === "@") {
      arobase = true;
      newEmail += "@";
      continue;
    }
    if (email[i] === "." && arobase) {
      newEmail += email.slice(i);
      break;
    }
    if (reveal) newEmail += String.fromCharCode(email.charCodeAt(i) - gap);
    else newEmail += String.fromCharCode(email.charCodeAt(i) + gap);
  }
  return newEmail;
}