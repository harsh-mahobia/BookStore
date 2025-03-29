"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_handler_1 = __importDefault(require("./middlewares/error_handler"));
const auth_1 = __importDefault(require("./routes/auth"));
const book_1 = __importDefault(require("./routes/book"));
const connection_1 = __importDefault(require("./database/connection"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, connection_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get('/', (req, res) => {
    res.send(' Server running');
});
app.use("/api", auth_1.default);
app.use("/api", book_1.default);
app.use(error_handler_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at https://localhost:${port}`);
});
