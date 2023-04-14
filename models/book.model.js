const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Category = require('./category.model')

const bookSchema = new Schema({

    title : {
        type :String,
        required : true
    },
    author : {
        type :String
    },

    pages : {

        type : Number ,
        required : true
    }
    ,
    copies : {

        type : Number,
        required : true
    },
    category:{ 
        type:  mongoose.Schema.Types.ObjectId, ref:'Category'
    },
    nombreEmp:{
        type:Number,
        default:0
    },
    rating:{
        type:Number,
        required :false
    }
})


const Book =  mongoose.model('Book',bookSchema )
module.exports= Book