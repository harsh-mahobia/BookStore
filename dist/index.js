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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const prometheus_1 = require("./monitoring/prometheus");
const error_handler_1 = __importDefault(require("./middlewares/error_handler"));
const auth_1 = __importDefault(require("./routes/auth"));
const book_1 = __importDefault(require("./routes/book"));
const connection_1 = __importDefault(require("./database/connection"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const ratelimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "You have reached your maximum request limit for this time period, try after 15 mins",
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, connection_1.default)();
app.use(ratelimiter);
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get('/', (req, res) => {
    res.send(' Server running');
});
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', prometheus_1.register.contentType);
    try {
        const data = yield prometheus_1.register.metrics();
        res.status(200).send(data);
    }
    catch (error) {
        res.status(500).send('Error fetching metrics');
    }
}));
app.use("/api", auth_1.default);
app.use("/api", book_1.default);
app.use(error_handler_1.default);
app.listen(port, () => {
    console.log(`Server is Fire at https://localhost:${port}`);
});
