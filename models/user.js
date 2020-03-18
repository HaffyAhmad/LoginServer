var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pasportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    
}); 

User.plugin(pasportLocalMongoose);

module.exports = mongoose.model('User', User);