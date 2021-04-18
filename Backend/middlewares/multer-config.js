const multer = require('multer');

const MINE_TYPE ={
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) =>{
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_TYPE[file.minetype];
        callback(null, name + Date.now() + '.' + extension)
    }  
})
module.exports = multer({ storage }).single('image');