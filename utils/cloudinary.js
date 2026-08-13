const multer = require("multer");
const { storage } = require("../cloudCongfig.js");

console.log("Cloudinary storage loaded");

const upload = multer({ storage });

module.exports = upload;