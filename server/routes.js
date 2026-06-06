const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/* DOWNLOAD */
router.get("/download/:file", (req, res) => {
    try {

        const fileName = req.params.file;

        const filePath = path.join(__dirname, "..", "uploads", fileName);

        // 🔥 segurança básica (evita path injection)
        if (fileName.includes("..")) {
            return res.status(400).send("Pedido inválido");
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).send("Ficheiro expirado ou não encontrado");
        }

        res.download(filePath, (err) => {
            if (err) {
                console.error("DOWNLOAD ERROR:", err);
            }

            // 🔥 remove ficheiro após download
            fs.unlink(filePath, (err) => {
                if (err) console.error("DELETE ERROR:", err);
            });
        });

    } catch (err) {
        console.error("ROUTE ERROR:", err);
        res.status(500).send("Erro interno");
    }
});

module.exports = router;
