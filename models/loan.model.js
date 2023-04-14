const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Book = require('./book.model');

const LoanSchema = new Schema({

    user :{

        type : mongoose.Schema.Types.ObjectId , ref:'User'

    },
    book :{

        type : mongoose.Schema.Types.ObjectId , ref :'Book'

    },
    loanDate:{

        type:Date,
        required:true
    },
    returnDate: {
        type: Date
    },
    renewedDate:{
        type : Date
    },
    status: {
        type: String,
        enum: ['active', 'overdue', 'returned' , 'renewed'],
        default: 'active'
    }

})

const Loan = mongoose.model('Loan',LoanSchema);
module.exports = Loan;