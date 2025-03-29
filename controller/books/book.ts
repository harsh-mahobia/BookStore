import { Request, Response, NextFunction } from "express";

import { AppError } from "../../middlewares/error_handler";
import Book from "../../database/book.model";

import bookValidator from "../../helpers/book.validator";


export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    bookValidator(req.body)
    const book = new Book(req.body)
    await book.save()


    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 5, sortBy = "price", order = "asc" } = req.query  //limit is used 5 because i've added only 6-7 books
    const sortOrder = order === "desc" ? -1 : 1
    const skip = (Number(page) - 1) * Number(limit)

    const books = await Book.find().sort({ [sortBy as string]: sortOrder }).skip(skip).limit(Number(limit));

    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.id;
    if (!bookId) throw new AppError("Books id not found", 404)

    const book = await Book.findOne({_id : bookId});
    if (!book) throw new AppError("Book not found", 404);
    res.json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBookById =
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      bookValidator(req.body, true);
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!book) throw new AppError("Book not found", 404)
      res.json(book);
    } catch (error) {
      next(error);
    }
  }

export const deleteBookById =

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id)
        throw new AppError("Book not found", 404);

      const book = await Book.findByIdAndDelete(id);
      if (!book) throw new AppError("Book not found", 404);
    } catch (error) {
      next(error);
    }
  }


export const filterBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, category, rating } = req.query
    const query: any = {};

    if (author) query.author = author;
    if (category) query.category = category;

    if (rating) query.rating = { $gte: Number(rating) }

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const searchBooksByTitle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.query;
    if (!title) throw new AppError("Title quey parameter is requird ", 400);

    const books = await Book.find({ title: { $regex: title, $options: "i" } });
    res.json(books);
  } catch (error) {
    next(error);
  }
};