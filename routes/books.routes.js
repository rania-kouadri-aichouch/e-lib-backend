
const express = require('express')
const controller = require('../controllers/book.controller')
const authorisation = require('../midddlewares/auth.middleware')

booksRouter = express.Router();

module.exports=booksRouter;

booksRouter.get('/all',controller.getAllBooks);
booksRouter.post('/create' , controller.createBook);
booksRouter.patch('/update/:id',controller.updateBook);
booksRouter.delete('/delete/:id', controller.deleteBook);
booksRouter.get('/detail/:id', controller.getBookById);



