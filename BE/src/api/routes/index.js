const express = require('express');
const path = require("path");
const https = require("https");
const admin = require('./auth.route');

const router = express.Router();

router.use("/docs", express.static("docs"));

router.get("/download/:filename", (req, res, next) => {
    const { filename } = req.params;
    const filepath = path.join(process.cwd(), `src/uploads/${filename}`);
    // const filepath = process.cwd()
    if (!filepath) return res.status(404).json({ message: "File does not exist" });

    res.download(filepath);
});

router.use('/admin',admin);

module.exports = router;
