const webp = require('webp-converter');
const path = require('path');
const fs = require('fs');

const imageConversion = async (req, res, next) => {
    if(req?.file){
    const filetypes = /jpg|jpeg|png/ 
    const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
    const mimetype = filetypes.test(req.file.mimetype);
    if(mimetype && extname) {
        const res = await webp.cwebp(req.file.path,`src/uploads/${path.parse(req.file.filename).name}.webp`,"-q 75",logging="-v");
        req.file.filename = `${path.parse(req.file.filename).name}.webp`;

        console.log(res);
        //delete the original file
        fs.unlink(req.file.path, (err) => {
            if (err) throw err;
            console.log('successfully deleted');
        });
    }
    // console.log(req.file);

    }
    next();
}

module.exports = imageConversion;