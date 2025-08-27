const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup",
    wrapAsync(userController.signUp));


router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", { /* It is a middleware */
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.login
);

router.get("/logout", userController.logOut);

module.exports = router;