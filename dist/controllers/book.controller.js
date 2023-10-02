"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getAllBooks = exports.getBookById = exports.createBook = void 0;
const book_models_1 = __importDefault(require("../models/book.models"));
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookBody = req.body;
        // Check if the book already exists
        const existingBook = yield book_models_1.default.findOne({
            where: {
                author: bookBody.author,
                title: bookBody.title,
                // Add other fields as needed for uniqueness check
            },
        });
        if (existingBook) {
            throw new Error("Book already exists");
        }
        const newBook = yield book_models_1.default.create({
            title: bookBody.title,
            author: bookBody.author,
            // Add other fields as needed
            userId: req.userId, // Assuming you have the user ID from authentication
        });
        res.status(201).json({
            status: 201,
            message: "Book is created successfully",
            data: newBook, // You can also send the created book data back if needed
        });
    }
    catch (error) {
        res.status(400).json({
            status: 400,
            message: error,
        });
    }
});
exports.createBook = createBook;
// Get a book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = Number(req.params.id);
        // Find the book by ID using Sequelize
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            throw new Error("Book not found");
        }
        res.status(200).json({
            status: 200,
            data: book,
        });
    }
    catch (error) {
        res.status(404).json({
            status: 404,
            message: error,
        });
    }
});
exports.getBookById = getBookById;
// Get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_models_1.default.findAll();
        return res.json(books);
    }
    catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({ error: "Error fetching books" });
    }
});
exports.getAllBooks = getAllBooks;
// Update a book by ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const { title, author } = req.body;
        const userId = req.userId; // Get the authenticated user's ID from the JWT middleware
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        // Check if the book is already rented by the user
        if (book.get("userId") === userId) {
            return res
                .status(400)
                .json({ error: "You have already rented this book" });
        }
        // Rent the book by associating it with the user
        book.set("userId", userId); // Use set() to update the property
        yield book.save();
        return res.status(200).json({ message: "Book rented successfully" });
    }
    catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({ error: "Error updating book" });
    }
});
exports.updateBook = updateBook;
// Delete a book by ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        yield book.destroy();
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ error: "Error deleting book" });
    }
});
exports.deleteBook = deleteBook;
