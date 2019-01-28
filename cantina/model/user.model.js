var mongoose = require("mongoose")
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String},
    email:{type:String},
    password: {type:String},
    notification:{type:Boolean}
})

var User = mongoose.model('User', userSchema);

module.exports = User;