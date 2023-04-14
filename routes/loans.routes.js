const express = require('express')
LoanRouter = express.Router();
const controller = require('../controllers/loan.controller');
const penalities = require('../midddlewares/penality.middleware');
const authorisation = require('../midddlewares/auth.middleware');

//,[authorisation.VerifyToken, penalities.checkPenality]
module.exports = LoanRouter;

LoanRouter.get('/all',controller.getAllLoans);
LoanRouter.post('/create',[authorisation.VerifyToken , penalities.checkPenality],controller.loanBook);
LoanRouter.post('/return',controller.returnBook);
LoanRouter.get('/history/:id',controller.history);
LoanRouter.post('/renew/:book',[authorisation.VerifyToken ,penalities.checkRenew],
                              controller.renewLoan
                              
                              );


