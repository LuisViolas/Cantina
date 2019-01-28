var cantina = require("../controller/Cantina.Controller");

global.app.get('/update',cantina.UpdateQueue);
global.app.post('/Notification',cantina.Notification);
//global.app.post('/login',Auth.login);
//global.app.get('/logout',Auth.logout);