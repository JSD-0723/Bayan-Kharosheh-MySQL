import { Request, Response } from 'express';
import Book from '../models/book.models';

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author } = req.body;
    const book = await Book.create({ title, author });
    return res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({ error: 'Error creating book' });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    return res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return res.status(500).json({ error: 'Error fetching book' });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return res.status(500).json({ error: 'Error fetching books' });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const { title, author } = req.body;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.update({ title, author });
    return res.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    return res.status(500).json({ error: 'Error updating book' });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    await book.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting book:', error);
    return res.status(500).json({ error: 'Error deleting book' });
  }
};
