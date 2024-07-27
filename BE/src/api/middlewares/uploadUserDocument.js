const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename(req, file, cb) {
        const { name } = req.query;
        const allowedFileFormats = [".jpg", ".jpeg", ".png", ".gif", ".pdf"]; // Add or modify the allowed file formats as needed
        const generatedFilename = `${name}-${Date.now()}${Math.floor(
            Math.random() * 10000,
        )}${path.extname(file.originalname)}`;

        // Check for directory traversal in the generated filename
        if (generatedFilename.includes("../")) {
            const error = new Error("Invalid filename: Directory traversal attempt detected");
            return cb(error);
        }

        // Check if the file format is allowed
        const fileExtension = path.extname(generatedFilename).toLowerCase();
        if (!allowedFileFormats.includes(fileExtension)) {
            const error = new Error("Invalid file format: Not allowed");
            return cb(error);
        }

        cb(null, generatedFilename);
    },
});

const upload = multer({
    storage,
});

module.exports = upload;
