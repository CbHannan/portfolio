var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cors = require('cors');
var nodemailer = require("nodemailer");
var name, email, message;
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cors());

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "codyhannanportfolio@gmail.com",
    pass: "portfolio92"
  }
 });
 console.log("blahblahblah");
 
router.post('/', function (req, res, next) {
  console.log(req.body.name);
  mailOptions = {
    to: "codybhannan@gmail.com",
    subject: "Message sent from your portfolio",
    html: "Sender: " + req.body.name + " <br>" + "Email: " + req.body.email + " <br>" + "Message: " + req.body.message
  }
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.json(error);
      console.log("message didnt send");
    } else {
      res.json(response);
      console.log("message sent");
    }
  });

 });
router.get('/', function (req, res, next) {
  console.log("blahblahhahah");
  res.end();
});

module.exports = router;
