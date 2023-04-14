const express = require('express');
const controller = require('../controllers/auth.controller');
const authRouter = express.Router();
const auth = require('../midddlewares/auth.middleware');


authRouter.post('/reg', controller.register);
authRouter.get('/all',controller.getAllUsers);
authRouter.post('/login', controller.login);
authRouter.delete('/delete/user/:id',controller.deleteUser);


module.exports = authRouter;
