import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

// Create a new book
router.post('/books', bookController.createBook);

// Get a book by ID
router.get('/books/:id', bookController.getBookById);

// Get all books
router.get('/books', bookController.getAllBooks);

// Update a book by ID
router.put('/books/:id', bookController.updateBook);

// Delete a book by ID
router.delete('/books/:id', bookController.deleteBook);

export default router;
