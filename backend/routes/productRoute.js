const express = require("express");
const router = express.Router();

const productController = require("../controller/productController");
const { body, check } = require("express-validator");

const multer = require("multer");
const { response } = require("express");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.originalname + '-' + uniqueSuffix)
    cb(null, file.originalname);
  },
});

// filter png,jpeg,jpg
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png"||
//     file.mimetype ==="image/jfif"
//   ) {
//     // To accept the file pass `true`, like so:
//     cb(null, true);
//   } else {
//     // To reject this file pass `false`, like so:
//     cb(null, false);
//   }
// };
// 5 mb ki image
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  // fileFilter: fileFilter,
});
// to image upload  close


router.post(
    "/createproduct",
    upload.single('image'),
    productController.createproduct
  );


  router.get("",productController.getproduct)

  module.exports = router;