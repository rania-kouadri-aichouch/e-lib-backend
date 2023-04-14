const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new Schema(
    {
        email:{
            type : String,
            required : true,
            unique:true
        },

        password : {

            type: String,
            required : true
        } ,

        role: {
            type: String,
            enum: ["reader","admin"],
            required: [true, "Please specify user role"]
        },
    }
)

//static login method

userSchema.statics.login = async function(email , password){



    if (!email || !password ){

        throw Error('all fields are required !')
    }
    
    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password , user.password)

    if (!match){

        throw Error('incorrect pasword')
    }

    return user


}



//static signup method

userSchema.statics.signup = async function(email , password , role) {

    //validtion

    if (!email || !password || !role){

        throw Error('all fields are required !')
    }

    if (!validator.isEmail(email)){

        throw Error('invalid email')
    }

    if (!validator.isStrongPassword(password))
    {
        throw Error('you should send a strong password !')
    }

    const exists = await this.findOne({email})

    if (exists){

        throw Error('Email existe')
    }

    const salt =await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email , password : hash , role})

    return user.toObject({ getters: true, versionKey: false, transform: function (doc, ret) {
        delete ret.password;
    } });


}

const User = mongoose.model('User',userSchema);

module.exports = User ;
