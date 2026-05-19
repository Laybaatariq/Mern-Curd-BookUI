const express = require('express');
const { 
    handleBookStoreController,
    getAllBooks,      // ADD THIS - Import getAllBooks
    deleteBook,
    updateBook
} = require('../controller/book.controller');

const router = express.Router();

// http://localhost:5000/api/books/add
router.post('/add', handleBookStoreController);

// http://localhost:5000/api/books/all
router.get('/all', getAllBooks);

router.delete('/delete/:id', deleteBook);

router.delete('/update/:id', updateBook);

module.exports = router;