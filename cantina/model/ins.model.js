var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ins = new Schema({
  timestamp: { type: Date, default: Date.now }
  // value: { type: Number, required: true }   // nao preciso deste valor porque mal entra o timestamp mal detata ja chega quando entra esse valor
});

module.exports = mongoose.model('in', Ins);