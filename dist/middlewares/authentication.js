"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("./error_handler");
const authenticateUser = (req, res, next) => {
    try {
        const token = req.header("AuthToken");
        if (!token) {
            throw new error_handler_1.AppError("Access denied. No token fond.", 401);
        }
        const decoded = jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new error_handler_1.AppError("invalid or expired token.", 401));
    }
};
exports.authenticateUser = authenticateUser;
