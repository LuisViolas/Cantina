var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var cantinaSchema = new Schema({
    gotIn: {type:Number},
    gotOut:{type:Number},
    diaSemana: {type:String},
    semanaAno: {type:Number}
})

var Cantina = mongoose.model('Cantina', cantinaSchema);

module.exports = Cantina;