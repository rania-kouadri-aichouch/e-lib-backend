const express = require('express');
const controller = require('../controllers/overview.controller');

const overviewRouter = express.Router();

overviewRouter.get('/', controller.overview);


module.exports = overviewRouter;
