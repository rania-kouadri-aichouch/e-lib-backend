const express = require('express');
const commentRouter = express.Router();
const controller = require('../controllers/comments.controller');

module.exports = commentRouter;


commentRouter.post('/add',controller.addComment);
commentRouter.get('/get/:id',controller.deleteComment);
commentRouter.get('/all',controller.getAllComments);
commentRouter.patch('/update/:id',controller.updateComment);
commentRouter.delete('/delete/:id',controller.deleteComment);