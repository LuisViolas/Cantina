global.express = require('express');
global.fetch = require("node-fetch");

var port = process.env.PORT;

global.bodyParser = require('body-parser');

global.app = global.express();

global.google = require("googleapis");
 
global.mongoose = require('mongoose');
global.jwt = require("jsonwebtoken");
global.bcrypt = require("bcryptjs");

//604176730860-tvp0tnfuajvmcitdv9tgj6vvo884762l.apps.googleusercontent.com
// API KEY AIzaSyCmRl4Y7uwMw2pjT5u6nNziRHd1ZNST_0c

global.nodemailer = require('nodemailer');
global.smtp = require('smtp')
global.smtpTransport = require('nodemailer-smtp-transport')

require('./assets/mongo');

global.app.use(global.bodyParser.json(), global.bodyParser.urlencoded({ extended: true }));


global.app.listen(port, function(err) {
    if (!err) {
        console.log('Your app is listening on port ' + port);
    }
    else {
        console.log(err);
    }
});

global.AuthController = require('./controller/Auth.Controller.js')

global.cantinaController = require('./controller/Cantina.Controller.js')

global.UserRoute = require('./routes/user.route.js');
global.cantinaRoute = require('./routes/cantina.route.js');
//module.exports=app;
