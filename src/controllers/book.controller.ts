import { Request, Response } from "express";
import Book from "../models/book.models";

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;

    // Check if the book already exists
    const existingBook = await Book.findOne({
      where: {
        author: bookBody.author,
        title: bookBody.title,
        // Add other fields as needed for uniqueness check
      },
    });

    if (existingBook) {
      throw new Error("Book already exists");
    }

    const newBook = await Book.create({
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
    
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);

    // Find the book by ID using Sequelize
    const book = await Book.findByPk(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    res.status(200).json({
      status: 200,
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error,
    });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ error: "Error fetching books" });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const { title, author } = req.body;

    const userId = req.userId; // Get the authenticated user's ID from the JWT middleware

    const book = await Book.findByPk(bookId);
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
    await book.save();

    return res.status(200).json({ message: "Book rented successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({ error: "Error updating book" });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    await book.destroy();
    return res.status(204).send(); // No content
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ error: "Error deleting book" });
  }
};
