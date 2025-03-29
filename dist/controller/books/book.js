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
exports.searchBooksByTitle = exports.filterBooks = exports.deleteBookById = exports.updateBookById = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const error_handler_1 = require("../../middlewares/error_handler");
const book_model_1 = __importDefault(require("../../database/book.model"));
const book_validator_1 = __importDefault(require("../../helpers/book.validator"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, book_validator_1.default)(req.body);
        const book = new book_model_1.default(req.body);
        yield book.save();
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 5, sortBy = "price", order = "asc" } = req.query; //limit is used 5 because i've added only 6-7 books
        const sortOrder = order === "desc" ? -1 : 1;
        const skip = (Number(page) - 1) * Number(limit);
        const books = yield book_model_1.default.find().sort({ [sortBy]: sortOrder }).skip(skip).limit(Number(limit));
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.id;
        if (!bookId)
            throw new error_handler_1.AppError("Books id not found", 404);
        const book = yield book_model_1.default.findOne({ _id: bookId });
        if (!book)
            throw new error_handler_1.AppError("Book not found", 404);
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
const updateBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, book_validator_1.default)(req.body, true);
        const book = yield book_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book)
            throw new error_handler_1.AppError("Book not found", 404);
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBookById = updateBookById;
const deleteBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            throw new error_handler_1.AppError("Book not found", 404);
        const book = yield book_model_1.default.findByIdAndDelete(id);
        if (!book)
            throw new error_handler_1.AppError("Book not found", 404);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBookById = deleteBookById;
const filterBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, category, rating } = req.query;
        const query = {};
        if (author)
            query.author = author;
        if (category)
            query.category = category;
        if (rating)
            query.rating = { $gte: Number(rating) };
        const books = yield book_model_1.default.find(query);
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.filterBooks = filterBooks;
const searchBooksByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.query;
        if (!title)
            throw new error_handler_1.AppError("Title quey parameter is requird ", 400);
        const books = yield book_model_1.default.find({ title: { $regex: title, $options: "i" } });
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.searchBooksByTitle = searchBooksByTitle;
