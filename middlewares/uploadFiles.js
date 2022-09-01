const multer = require('multer');
const path = require('path');

const storageProducts = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/images/celulares' )
    },
    filename : (req,file,callback) => {
        callback(null, `product-${Date.now()}${path.extname(file.originalname)}` )
    }
})

const storageUsers = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, './public/images/users' )
    },
    filename : (req,file,callback) => {
        callback(null, `avatar-${Date.now()}${path.extname(file.originalname)}` )
    }
});

const fileFilter = (req,file,callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes jpg, jpeg, png, gif, webp";
        return callback(null, false, req.fileValidationError)
    }
    return callback(null,true)
}

const uploadProducts = multer({
    storage : storageProducts,
    fileFilter
});

const uploadUsers = multer({
    storage : storageUsers
});

module.exports = {
    uploadProducts,
    uploadUsers
}