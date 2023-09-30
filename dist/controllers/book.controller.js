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
        const { title, author } = req.body;
        const book = yield book_models_1.default.create({ title, author });
        return res.status(201).json(book);
    }
    catch (error) {
        console.error('Error creating book:', error);
        return res.status(500).json({ error: 'Error creating book' });
    }
});
exports.createBook = createBook;
// Get a book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        return res.json(book);
    }
    catch (error) {
        console.error('Error fetching book:', error);
        return res.status(500).json({ error: 'Error fetching book' });
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
        console.error('Error fetching books:', error);
        return res.status(500).json({ error: 'Error fetching books' });
    }
});
exports.getAllBooks = getAllBooks;
// Update a book by ID
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const { title, author } = req.body;
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        yield book.update({ title, author });
        return res.json(book);
    }
    catch (error) {
        console.error('Error updating book:', error);
        return res.status(500).json({ error: 'Error updating book' });
    }
});
exports.updateBook = updateBook;
// Delete a book by ID
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        const book = yield book_models_1.default.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        yield book.destroy();
        return res.status(204).send(); // No content
    }
    catch (error) {
        console.error('Error deleting book:', error);
        return res.status(500).json({ error: 'Error deleting book' });
    }
});
exports.deleteBook = deleteBook;
