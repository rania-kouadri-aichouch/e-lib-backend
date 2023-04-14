const Loan = require('../models/loan.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');


async function getAllLoans(req , res){

    try{

        const loans = await Loan.find({});
        res.status(200).send(loans);

    }catch(error){

        res.status(400).json({"message":error.message});
    }


}


async function loanBook(req, res) {
    const { user, book } = req.body;

    try {


        // check if the book is available
        const requestedbook = await Book.findOne({_id:book});
        if (!requestedbook || requestedbook.copies == 0){
           
            return res.status(400).json("this book is not available");

        }
        
        let loanDate = new Date();
        let count = 0;
        loanMonth = loanDate.getMonth();
        sameBookLoans = await Loan.find({user : user , book :book , status :"active"});

        //check if user trying to loan same book

        if (sameBookLoans.length >= 1){

            return res.status(400).json("you already loan this book  ");
        }

        const userLoans = await Loan.find({ user: user, status: { $ne: "returned" }});
        userLoans.forEach(loan => {
            if (loan.loanDate.getMonth() == loanMonth){
                
                count +=1;
            }
           
        });
        //check loan possiblty
        if (count >= 3){

            return res.status(400).json("you have 3 loans active");
        }


        
        let returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 20);

        const loan = new Loan({ user: user, book: book, loanDate: loanDate, returnDate: returnDate });
        await loan.save();

       
        requestedbook.nombreEmp += 1;
        requestedbook.copies -=1;
        await requestedbook.save();

        res.send(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


async function returnBook(req, res) {
    const { user, book } = req.body;
  
    try {
      const requestedbook = await Book.findById(book);
      console.log(requestedbook);
      const loan = await Loan.findOne({ user: user, book: book });
      if (!loan){
        return res.send("you didn't loan this book")
      }
      loan.status = "returned";
      await loan.save();

      if (!requestedbook) {
        return res.status(400).json("Book not found");
      }
      requestedbook.copies += 1;
      await requestedbook.save();
  
      return res.status(200).json({
        message: "Book returned successfully",
      });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


// user loans history

async function history(req , res){

    const id = req.params.id;


    try{

        const history = await Loan.find({user : id}).populate('book')
                                                    .select('loanDate renewDate user status');


        res.status(200).send(history);

       
    }
    catch(error){

        res.status(500).json({ message: error.message });

    }

}


//renew loan

async function renewLoan(req, res) {
    

    try {
        const requestedBook = await Book.findById(req.params.book);
        const loan = await Loan.findOne({ user: req.user, book: req.params.book, status: "active" });

        if (!loan) {
            return res.status(400).send("No active loan found for this user and book");
        }

        loan.status = "renewed";
        loan.renewedDate = new Date();
        
        let returnDate = loan.returnDate;
        if (!returnDate) {
            throw new Error("Return date is undefined");
        }
        returnDate.setDate(returnDate.getDate() + 20);
        
        await loan.save();
        
        res.status(200).send("Loan renewed successfully");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={

    getAllLoans,
    loanBook,
    returnBook,
    history,
    renewLoan
}