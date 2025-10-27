// const fs = require('fs/promises')
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(process.cwd(), 'temp'))
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
//         cb(
//             null,
//             `${file.fieldname}-${uniqueSuffix}${path.extname(
//                 file.originalname
//             )}`
//         )
//     },
// })

// const Upload = multer({ storage: storage })

// Upload.remove = (filename) => {
//     return fs.unlink(path.join(process.cwd(), 'uploads', filename))
// }
// Upload.removeTemp = (filename) => {
//     return fs.unlink(path.join(process.cwd(), 'temp', filename))
// }
// Upload.save = (filename) => {
//     const oldPath = path.join(process.cwd(), 'temp', filename)
//     const newPath = path.join(process.cwd(), 'uploads', filename)
//     return fs.rename(oldPath, newPath)
// }
// Upload.isDefaultAvatar = (filename) => {
//     return filename === 'default-avatar.png'
// }

// module.exports = Upload
const fs = require("fs/promises");
const multer = require("multer");
const path = require("path");

// temp va uploads papkalari
function getTempPath(fieldname) {
    if (fieldname === "passportImage") {
        return path.join(process.cwd(), "temp/passport");
    }
    return path.join(process.cwd(), "temp/others");
}

function getUploadPath(fieldname) {
    if (fieldname === "passportImage") {
        return path.join(process.cwd(), "uploads",'passport');
    }
    return path.join(process.cwd(), "uploads",'others');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const tempPath = getTempPath(file.fieldname);
        cb(null, tempPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
        );
    },
});

const Upload = multer({ storage: storage });

// Fayllarni boshqarish
Upload.remove = (fieldname, filename) => {
    return fs.unlink(path.join(getUploadPath(fieldname), filename));
};
Upload.removeTemp = (fieldname, filename) => {
    return fs.unlink(path.join(getTempPath(fieldname), filename));
};
Upload.save = (fieldname, filename) => {
    const oldPath = path.join(getTempPath(fieldname), filename);
    const newPath = path.join(getUploadPath(fieldname), filename);
    return fs.rename(oldPath, newPath);
};

module.exports = Upload;
