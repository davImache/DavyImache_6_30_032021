//Importer multer
const multer = require('multer');

//Définir l'extension des fichiers images
const MINE_TYPE ={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

//Configuration de multer
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //Générer un nouveau nom de fichier
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_TYPE[file.minetype];
        callback(null, name + Date.now() + '.' + extension)
    }  
})

//Exporter multer et limiter les  des images uploader
module.exports = multer({storage: storage, limits: { fieldSize: 1 * 1024 * 1024 },}).single("image");
