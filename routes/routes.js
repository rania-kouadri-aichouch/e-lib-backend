//This file contains all of the other route files and is just a way to organize the project

const express = require('express');
const router = express.Router();

module.exports = router;

router.use('/auth', require('./auth.routes'));
router.use('/books',require('./books.routes'));
router.use('/categories',require('./category.routes'));
router.use('/loans',require('./loans.routes'));
router.use('/comments',require('./comments.routes'));
router.use('/overview',require('./overview.routes'));


