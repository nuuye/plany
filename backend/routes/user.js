const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.post("/checkingEmail", userCtrl.emailCheck);
router.get("/getUser/:id", userCtrl.getUser);

module.exports = router;
