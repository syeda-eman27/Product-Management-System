const express = require("express");
const router = express.Router();

const {
registerUser,
loginUser,
logoutUser
} = require("../Controllers/authController");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);

router.get("/register",(req,res)=>{
    res.render("register");
});

router.get("/login",(req,res)=>{
    res.render("login");
});

module.exports = router;