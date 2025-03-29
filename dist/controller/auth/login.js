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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../../database/user.model"));
const error_handler_1 = require("../../middlewares/error_handler");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new error_handler_1.AppError("Email and password are required", 400);
        }
        if (typeof email !== "string" || typeof password !== "string") {
            throw new error_handler_1.AppError("Invlid input types", 400);
        }
        if (!email.includes("@") || !email.includes(".")) {
            throw new error_handler_1.AppError("invalid email format", 400);
        }
        if (password.length < 6) {
            throw new error_handler_1.AppError("password must be at least 6 characters long", 400);
        }
        const user = yield user_model_1.default.findOne({ email });
        if (!user || user.password !== password) {
            throw new error_handler_1.AppError("Invalid credentials", 401);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.json({ token });
    }
    catch (error) {
        next(error);
    }
});
