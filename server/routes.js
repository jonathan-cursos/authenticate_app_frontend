const express = require("express");
const passport = require('passport')
const router = express.Router();
require("./auth/strategies/google");
require("./auth/strategies/twitter");
require("./auth/strategies/facebook");

router.get(
  "/google",
  passport.authenticate("google-auth", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google-auth", { session: false }),
  (req, res) => {
    console.log(req.user.token);
    res.cookie("token", req.user.token);
    res.redirect("/");
    // res.redirect("http://localhost:3001");
  }
);

router.get("/twitter", passport.authenticate("twitter-auth"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter-auth", { session: false }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("/");
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook-auth", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook-auth", { session: false }),
  (req, res) => {
    res.cookie("token", req.user.token);
    res.redirect("/");
  }
);

module.exports = router;