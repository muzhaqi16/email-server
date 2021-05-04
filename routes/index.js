var express = require("express");
var router = express.Router();
const mailServer = require("../utils");

router.post("/", function (req, res, next) {
  const { name, email, phone, subject, message } = req.body;
  mailServer
    .sendEmail(name, email, phone, subject, message)
    .then((msg) => res.json(msg));
});

module.exports = router;
