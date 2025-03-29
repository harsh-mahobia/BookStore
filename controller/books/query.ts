import { Request, Response, NextFunction } from "express";

import Book from "../../database/book.model";

import { AppError } from "../../middlewares/error_handler"



export const filterBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { author, category, rating } = req.query
      const query: any = {};
  
      if (author) query.author = author;
      if (category) query.category = category
      if (rating) query.rating = { $gte: Number(rating) }
  
      const books = await Book.find(query);
      res.json(books);
    } catch (error) {
      next(error);
    }
  };
  
  // Search books by title (partial matches)
  export const searchBooksByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.query
      if (!title) throw new AppError("Title query parameter is required", 400);
  
      const books = await Book.find({ title: { $regex: title, $options: "i" } })
      res.json(books)
    } catch (error) {
      next(error);
    }
  };
  