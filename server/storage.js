const fs = require("fs");

const downloads = new Map();

function addFile(id, filePath) {
    downloads.set(id, filePath);

    setTimeout(() => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        downloads.delete(id);
    }, 5 * 60 * 1000);
}

function getFile(id) {
    return downloads.get(id);
}

function removeFile(id) {
    downloads.delete(id);
}

module.exports = {
    addFile,
    getFile,
    removeFile
};