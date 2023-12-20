const express = require("express")

const router = express.Router()
const {signUP, logIn} = require("../controller/authController")

router.route("/signup").post(signUP)
router.route("/login").post(logIn);


module.exports = router