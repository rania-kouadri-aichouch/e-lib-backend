const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')


const CommentSchema = new Schema({
    
    user :{

        type : mongoose.Schema.Types.ObjectId , ref:'User'

    },

    content : {
        type : String ,
        required : true
    }


})

const Comment = mongoose.model('Comment' , CommentSchema);



const ReplaySchema = new Schema({
    
    user :{

        type : mongoose.Schema.Types.ObjectId , ref:'User'

    },

    Comment :{

        type : mongoose.Schema.Types.ObjectId , ref:'Comment'


    },

    content : {
        type : String ,
        required : true
    }


})

const Replay = mongoose.model('Replay' , ReplaySchema);



  
  
  
  
module.exports = {

    Comment ,
    Replay
}