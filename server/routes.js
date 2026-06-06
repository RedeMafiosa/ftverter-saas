const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { convertYouTube } = require("./converter");
const storage = require("./storage");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* =========================
   CONVERT
========================= */
router.post("/convert", upload.single("file"), async (req, res) => {

    const { url, format } = req.body;

    const id = Date.now().toString();
    const outputPath = path.join(__dirname, "..", "uploads", `${id}.${format}`);

    try {

        if (url) {
            await convertYouTube(url, outputPath, format);
        } else {
            return res.status(400).json({ error: "Sem URL" });
        }

        storage.addFile(id, outputPath);

        return res.json({ id });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Erro conversão" });
    }
});

/* =========================
   DOWNLOAD
========================= */
app.get("/download/:file", (req, res) => {

    const filePath = path.join(__dirname, "uploads", req.params.file);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Ficheiro expirado");
    }

    res.download(filePath, () => {
        fs.unlink(filePath, () => {});
    });
});
/* =========================
   PAGES
========================= */
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/converter", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "converter.html"));
});

module.exports = router;
