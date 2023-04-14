
const express = require('express')
const controller = require('../controllers/book.controller')
const authorisation = require('../midddlewares/auth.middleware')

booksRouter = express.Router();

module.exports=booksRouter;

booksRouter.get('/all' ,[authorisation.VerifyToken , authorisation.isReader],controller.getAllBooks);
booksRouter.post('/create' , controller.createBook);
booksRouter.patch('/update/:id',[authorisation.VerifyToken] ,controller.updateBook);
booksRouter.delete('/delete/:id',[authorisation.VerifyToken] ,controller.deleteBook);



