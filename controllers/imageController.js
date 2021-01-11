const config = require('../config'),
multerS3 = require('multer-s3'),
multer = require('multer'); 

const profileImageUpload = multer({
    storage: multerS3({
     s3: config.aws3Config.s3,
     bucket: config.aws3Config.s3Config.bucket,
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
     }
    }),
    limits:{ fileSize: 3000000 }, // In bytes: 3000000 bytes = 3 MB
    fileFilter: function( req, file, cb ){
      checkFileTypeImage( file, cb );
    }
   }).single('file');


   module.exports = {
    profileImageUpload

}