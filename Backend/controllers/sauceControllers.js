// Importation du modèle de données pour une sauce
const Sauce = require("../models/sauceModel");

// Importer le package file system
const fs = require("fs");

// Créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(sauce);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "La sauce est enregistrée" }))
    .catch((error) => res.status(400).json({ error }));
};

//Modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "La sauce est modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: "Supression de cette sauce !" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//Afficher toutes les sauces
exports.getListSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//Afficher une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//Liker ou disliker une sauce
exports.likeSauce = (req, res, next) => {
  const sauceObject = req.body;
  const userId = req.body.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (like == 1 && !sauce.usersLiked.includes(userId)) {
        sauce.usersLiked.push(userId);
        sauce.likes++;
      } else if (like == -1 && !sauce.usersDisliked.includes(userId)) {
        sauce.usersDisliked.push(userId);
        sauce.dislikes++;
      } else if (like == 0 && sauce.usersLiked.includes(userId)) {
        sauce.likes--;
        let index = sauce.usersLiked.indexOf(userId);
        sauce.usersLiked.splice(index, 1);
      } else if (like == 0 && sauce.usersDisliked.includes(userId)) {
        sauce.dislikes--;
        let index = sauce.usersDisliked.indexOf(userId);
        sauce.usersDisliked.splice(index, 1);
      }
      Sauce.updateOne(
        { _id: req.params.id },
        {
          usersLiked: sauce.usersLiked,
          usersDisliked: sauce.usersDisliked,
          dislikes: sauce.dislikes,
          likes: sauce.likes,
        }
      )
        .then(() => res.status(200).json({ message: "Like ajoutée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
};