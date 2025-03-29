"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Serer Error",
    });
};
exports.default = errorHandler;
