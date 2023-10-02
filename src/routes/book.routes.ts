import express from "express";
import * as bookController from "../controllers/book.controller";
import jwtMiddleware from "../middleWares/jwtMiddleware";

const router = express.Router();

// Get all books
router.get("/books/", bookController.getAllBooks);

// Create a new book
router.post("/books/", jwtMiddleware, bookController.createBook);

// Get a book by ID
router.get("/books/:id", bookController.getBookById);

// Update a book by ID
router.put("/books/:id", jwtMiddleware, bookController.updateBook);

// Delete a book by ID
router.delete("/books/:id", jwtMiddleware, bookController.deleteBook);

export default router;
