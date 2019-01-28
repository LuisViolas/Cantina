var config = require("../assets/config");
var User = require("../model/user.model");
var VerifyToken = require('../controller/VerifyToken');
function SignIn(req,res)
{
    
    User.findOne({email:req.body.email}, function(err, user) {
        if(user){
            return res.status(500).send("The email is already registered");
        }
        else{
            console.log(req.body.username)
            console.log(req.body.email)
            //console.log(req.body.password)
            var hashedPassword = global.bcrypt.hashSync(req.body.password,8);
           // André: Foi adicionado esta vereficação para ver se email é mesmo um email
          if (verifyEmail(req.body.email)){
               User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            notification:false
            },
            
         function(err,user){
            if(err)
            {
                console.log("facil2")
                return res.status(500).send("There was a problem registering the user.")
            }
            //create token
            console.log("facil4")
            var token = global.jwt.sign({id:user._id},config.secret,{expiresIn:86400});
            res.status(200).send({auth:true,token:token});
            
            });
          }
          else {
              console.log("Isso não é um email");
          }
         
        }
    })
}

//ir buscar o id segundo o token
function loggedUser(req,res,next)    
{
    var token = req.body['x-access-token'];
    if(!token) 
    {
        return res.status(401).send({auth:false,message:'No token provided.'});
    }
    global.jwt.verify(token,config.secret, function(err,decoded){
        if(err)
        {
            return res.status(500).send({auth:false,message:'Failed to authenticate token.'});
        }    

        User.findById(decoded.id,{password:0},function(err,user){
            if(err)
            {
                console.log(decoded.id + "arroz");
                return res.status(500).send("There was a problem finding the user");
                
            }
            if(!user)
            {
                return res.status(440).send("No user found.");
            }
            return res.status(200).send(token);
            //next(user); // add this line
            })  
        });
       // add the middleware function
        //global.app.use(function (user, req, res, next) {
        //res.status(200).send(user);
        //});
}

function login(req,res)
{    
    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            return res.status(500).send("Error on the server.");
        }
        if(!user)
        {
            return res.status(433).send("No user found.");     
        }
        var nome = user.username;
        console.log(nome)
        var passwordIsvalid = global.bcrypt.compareSync(req.body.password,user.password);
        if(!passwordIsvalid)
        {
            return res.status(401).send({auth:false, token:null});
        }
        global.email = req.body.email;
       // req.session.nome= req.body.email;
        var token = global.jwt.sign({id:user._id},config.secret,{expiresIn:86400});
        
        res.status(200).send({auth:true, token:token, nome:nome});
    })
}
function logout(req,res)
{
  res.status(200).send({ auth: false, token: null });
}

/* --- Verificacoes --- */
function verifyEmail(email) {
    if (email.includes("@")) {
        return true;
    } else {
        return false;
    }
}

module.exports = 
{
    SignIn:SignIn,
    loggedUser:loggedUser,
    login:login,
    logout:logout,
    verifyEmail: verifyEmail
};