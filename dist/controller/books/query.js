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
exports.searchBooksByTitle = exports.filterBooks = void 0;
const book_model_1 = __importDefault(require("../../database/book.model"));
const error_handler_1 = require("../../middlewares/error_handler");
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
// Search books by title (partial matches)
const searchBooksByTitle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.query;
        if (!title)
            throw new error_handler_1.AppError("Title query parameter is required", 400);
        const books = yield book_model_1.default.find({ title: { $regex: title, $options: "i" } });
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.searchBooksByTitle = searchBooksByTitle;
