const Book = require('../models/book.model');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const mail = require('../utils/mail')

//get all books
async function getAllBooks(req, res) {

    const {
        category,
        writer,
        rating,
        nombreEmp
    }= req.query
    try{

        if(category){

            const data = await Book.find({category : category});
            res.json(data)
        }
        else if (writer){


            const data = await Book.find({author : writer});
            res.json(data)

        }
        else if (nombreEmp){

            const data = await Book.find({nombreEmp : nombreEmp});
            res.json(data)
        }
        else if (rating){

            const data = await Book.find({rating : rating});
            res.json(data)

        }
        else{

            const data = await Book.find({})
                                   .populate('category', 'title') ;
            res.json(data)

        }
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}



//create a book 
async function createBook(req, res) {

    try {
        const book = new Book(req.body);
        await book.save();

        const readers =  await User.find({role : "reader"});
        const from = "no-reply@e-lib.com"
        const subject = "new book"
        const text = "we added a new book you may want to check it"+book.title
        
        mail.sendEmailToMultipleUsers(from , readers ,subject , text);

        res.status(201).json({success:true, data: book});
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}


//update a book

async function updateBook(req, res) {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Book.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


async function deleteBook(req, res) {
    try {
        const id = req.params.id;
        
        await Book.findByIdAndDelete(id)
        
        res.send(`book has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports={

    getAllBooks,
    createBook,
    updateBook,
    deleteBook
}