import multer from "multer";
import path from "node:path";

const tempDir = path.resolve("temp");

const storage = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, callback) => {
        const uniquePrefix = `${req.user.email.split("@")[0]}_${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const filename = `${uniquePrefix}_${file.originalname}`;
        callback(null, filename);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const upload = multer({
    storage,
    limits,
});

export default upload;
