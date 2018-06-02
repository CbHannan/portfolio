var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require("nodemailer");
var name, email, message;
 var myEmail = "codybhannan@gmail.com";

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Savannah.Forum@gmail.com",
    pass: "Crossings"
  }
 });
 console.log("blahblahblah");
 router.use(bodyParser.urlencoded({ extended: true }));
 router.use(bodyParser.json());
 router.use(cors());
router.post('/', function (req, res, next) {
  name = req.body.name;
  email = req.body.email;
  message = req.body.message;
  console.log(req.body.name);
  mailOptions = {
    to: myEmail,
    subject: "Message sent from your portfolio",
    html: "Sender: " + name + "<br>" + "Email: " + email + "<br>" + "Message: " + message
  }
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.json(error);
    } else {
      res.json(response);
    }
  });

 });
router.get('/', function (req, res, next) {
  console.log("blahblahhahah");
  res.end();
});

module.exports = router;
