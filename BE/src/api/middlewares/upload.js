const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'src/uploads/')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${Math.floor((Math.random() * 10000))}${path.extname(file.originalname)}`
        )
    }
})

function checkFileType(req,file, cb) {
    const filetypes = /jpg|jpeg|png|webp/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    console.log(req.file,file,file.originalname);
    if (mimetype && extname) {
        const result = webp.cwebp(`../../src/uploads/${file.originalname}`,"output.webp","-q 80",logging="-v");
        result.then((response) => {
        console.log(response);
        });
        // webp.cwebp(file.originalname, "output.webp", "-q 80", function (status) {
        //     console.log(status);
        // });
        return cb(null, true)
    }
    else if (extname) {
        return cb(null, true)
    } else {
        cb('Invalid  file')
    }
}

const upload = multer({
    storage,
    // fileFilter: function (req,file, cb) {
    //     checkFileType(req, file, cb)
    // }
})



module.exports = upload