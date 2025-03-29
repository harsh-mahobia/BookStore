import { Router } from "express";

const router = Router();


import { getAllBooks, createBook, getBookById, updateBookById, deleteBookById, filterBooks, searchBooksByTitle } from "../controller/books/book";
import { authenticateUser } from "../middlewares/authentication";

router.get("/books", getAllBooks);
router.get("/books/filter",  filterBooks);
router.get("/books/search", searchBooksByTitle );
router.get("/books/:id",  getBookById);

router.post("/books", authenticateUser, createBook);
router.put("/books/:id", authenticateUser, updateBookById);
router.delete("/books/:id", authenticateUser, deleteBookById);



export default router;
