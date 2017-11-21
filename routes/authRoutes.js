const express = require("express");
const router = express.Router();
const db = require("../models");
const helpers = require("../helpers/todos");
const passport = require("passport");
require("../models/User");

router.route("/").get(
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.route("/callback").get(passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

module.exports = router;
