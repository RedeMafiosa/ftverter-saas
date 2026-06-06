const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/* DOWNLOAD */
router.get("/download/:file", (req, res) => {

    const filePath = path.join(__dirname, "..", "uploads", req.params.file);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Ficheiro expirado");
    }

    res.download(filePath, () => {
        fs.unlink(filePath, () => {});
    });
});

module.exports = router;
