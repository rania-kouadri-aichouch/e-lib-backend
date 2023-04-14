const mongoose = require('mongoose')
const Schema = mongoose.Schema



const PenalitySchema = new Schema({
    

    user :{

        type : mongoose.Schema.Types.ObjectId , ref:'User'

    },
    loan :{

        type : mongoose.Schema.Types.ObjectId , ref:'Loan'

    },
    date :{

        type : Date
    }

})

const Penality = mongoose.model('Penality' , PenalitySchema);
module.exports = Penality;