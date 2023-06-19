const express = require("express");
const router = express.Router();
// fetch user using jwt
var fetchuser = require("../middleware/fetchuser");
// my secret jwt
const JWT_SECRET = "Ghousisagoodb$oy";
// ...rest of the initial code omitted for simplicity.

// require controller modules for user
const userControllers = require("../controller/userController");
const { body, check } = require("express-validator");

// to image upload start
const multer = require("multer");
const { response } = require("express");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.originalname + '-' + uniqueSuffix)
    cb(null, file.originalname);
  },
});

// filter png,jpeg,jpg
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    // To reject this file pass `false`, like so:
    cb(null, false);
  }
};
// 5 mb ki image
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});
// to image upload  close

router.post(
  "/createuser",
  [
    check("name")
      .isLength({ min: 3, max: 30 })
      .withMessage("Name cannot be blank"),
    check("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .bail()
      .trim()
      .normalizeEmail(),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password cannot be blank"),
  ],
  upload.single("image"),
  userControllers.createuser
);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Enter a valid email")
      .bail()
      .trim()
      .normalizeEmail(),
    check("password")
      .isLength({ min: 1 })
      .withMessage("Password cannot be blank"),
  ],
  userControllers.login
);




router.get("/logout", fetchuser, userControllers.logout);



module.exports = router;
