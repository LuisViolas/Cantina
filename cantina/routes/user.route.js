//var express = require("express");
//var app = express();

//const router = require('express').Router()

var Auth = require("../controller/Auth.Controller");
var VerifyToken = require('../controller/VerifyToken');

global.app.post('/register',Auth.SignIn);
global.app.get('/me',VerifyToken,Auth.loggedUser);
global.app.post('/login',Auth.login);
global.app.get('/logout',Auth.logout);