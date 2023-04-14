const User = require('../models/user.model');
const Book = require('../models/book.model');
const Loan = require('../models/loan.model');


async function overview(req , res){

    let nbrEmp =0 ;
    let max = 0;
    let book

    try{

        const users = await User.find({role : "reader"});
        const books = await Book.find();
        const bookslist=await Book.find().sort({nombreEmp:-1}).limit(3);
        const loans = await Loan.find().count();

        books.forEach(element => {

            nbrEmp = nbrEmp + element.nombreEmp;
            if (nbrEmp > max){
                max = nbrEmp;
                book = element;
            }
        });

        return res.status(200).send({
			usersNumber: users.length,
			booksNumber: books.length,
            mostloanedBooks:bookslist,
			mostLoanBook: book,
            nbrEmp : max,
            nbr : loans
		});



    }
    catch(error){
       
        res.status(500).json({ message: error.message });

    }
}



module.exports={
    overview
}