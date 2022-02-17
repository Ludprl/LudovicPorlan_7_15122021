const multer = require("multer");

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/upload/avatars");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});

const uploadFilter = function (req, file, cb) {
    const name = file.originalname.split(" ").join("_");
    const regex = new RegExp("%00");
    const checkFileName = regex.test(name);

    if (checkFileName) {
        cb(new Error("Nom de fichier non conforme"));
    }

    if (
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/jpeg"
    ) {
        cb(new Error("Fichier non autorisé"));
    }
    cb(null, true);
};

module.exports = multer({ storage: storage, fileFilter: uploadFilter }).single(
    "file"
);
