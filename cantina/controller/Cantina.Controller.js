var Cantina = require('../model/cantina.model');
var Outs = require('../model/outs.model');
var Ins = require('../model/ins.model');
var User = require("../model/user.model");

var queue;
//temos de estar sempre a correr esta funcao para mudar os valores
function UpdateQueue(req, res) {

    Ins.countDocuments({}, function(err, valorEntrada) {
        if (err) {
            console.log("Deu mal ")
        }
        else {
            //  console.log("Ja deu. ", valorEntrada);
            Outs.countDocuments({}, function(err, valorSaida) {
                if (err) {

                }
                else {
                    // console.log("Number of docs2: ", valorSaida);
                    var diaSemana = Day();
                    var semanaAno = Week();
                    console.log("Entradas: " + valorEntrada);
                    console.log("saidas: " + valorSaida);
                    console.log("diaSemana" + diaSemana);
                    console.log("Semana: " + semanaAno)

                    Cantina.findOneAndUpdate({ diaSemana: diaSemana, semanaAno: semanaAno }, { $set: { gotIn: valorEntrada, gotOut: valorSaida } }, function(err, cantina) {
                        if (cantina) { //Aqui fazer o update a adicionar as pessoas a entrarem e sairem da fila
                            queue = valorEntrada - valorSaida;
                            var filaa = JSON.stringify(queue)
                            console.log("Fila: ", queue);
                            res.send(filaa);
                            SendEmail();
                        }
                        else {
                            console.log("Preciso de um dia...")
                            Cantina.create({
                                gotIn: valorEntrada,
                                gotOut: valorSaida,
                                diaSemana: Day(),
                                semanaAno: Week()
                            }, function(err, cantina) {
                                if (err)
                                    console.log("Erro a criar novo dia na cantina");
                                else {
                                    console.log("Fila do Dia criado");
                                    // return fila;   
                                }
                            })
                        }
                    });
                }
            });
        }

    });

}

//descobrir dia da semana
function Day() {
    var days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    var now = new Date();

    var day = now.getDay();

    for (var i = 0; i < days.length; i++) {
        return days[day]
    }
}
//descobrir a semana do ano
function Week() {
    var now = new Date();
    var week = new Date(now.getFullYear(), 0, 1);
    return Math.ceil((((now - week) / 86400000) + week.getDay() + 1) / 7);
}
//global.emails = []

function Notification(req,res)
{
    User.findOneAndUpdate({email:global.email},function(err,user1)
    {
        console.log({user1:user1});
        if(user1.notification==false)
        {
            User.findOneAndUpdate({ email: global.email }, { $set: { notification: true } }, function(err, user)
            {
                console.log(user.email +" "+ user.notification);
                if(err)
                {
                }
                res.status(200).send({notification:true});
            })
        }
        if(user1.notification==true)
        {
           User.findOneAndUpdate({ email: global.email }, { $set: { notification: false } }, function(err, user)
            {
                if(err)
                {
                }
            }) 
             res.status(200).send({notification:false});
        }
        
    })
}
//clicar no botao, depois acresta ao array de pessoas e mandar para essas pessoas
function SendEmail(req, res) {
    if (queue < 15) 
    {
        User.find({notification:true},function(err,client)
        {
            if(client)
            {
            console.log("entrou 2")
            console.log({client:client})
            console.log(client.email)
            var transporter = global.nodemailer.createTransport(global.smtpTransport({
                service: 'gmail',
                auth: {
                    user: 'luisviolas888@gmail.com',
                    pass: "bcnsvddlwtdktqhm"
                }
            }));
            transporter.verify(function(error, success) {
                if (error) { console.log(error); }
                else { console.log('Server is ready to take our messages'); }
            })
            var mailOptions = {
                from: "luisviolas888@gmail.com",
                to: client.email,
                subject: "Fila da Cantina",
                html: "Encontram se menos de 15 pessoas na fila, é sua oportunidade" //global.nomeCliente + " alterou o seu livre Full Cv"
            }
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) { console.log(error); }
                else {
                    console.log('Email sent: ' + info.response);
                    res.end('{"success" : "Updated Successfully", "status" : 200}');
                }
            });
            }
            else{
                console.log("Nao tem avisos")
            }
        })
    }
}
module.exports = {
    UpdateQueue: UpdateQueue,
    SendEmail: SendEmail,
    Day: Day,
    Notification:Notification,
    Week: Week
}
