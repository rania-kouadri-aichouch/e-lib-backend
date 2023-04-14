const express = require('express')
categoryRouter = express.Router();

const controller = require('../controllers/category.controller');

module.exports=categoryRouter;

categoryRouter.get('/all',controller.getAllCategories);
categoryRouter.post('/create',controller.createCategory);