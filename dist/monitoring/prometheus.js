"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomMetric = exports.register = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
exports.register = register;
register.setDefaultLabels({
    app: 'example-nodejs-app',
});
prom_client_1.default.collectDefaultMetrics({ register });
const http_request_counter = new prom_client_1.default.Counter({
    name: 'myapp_http_request_count',
    help: 'Count of HTTP requests made to my app',
    labelNames: ['method', 'route', 'statusCode'],
});
const http_request_duration = new prom_client_1.default.Histogram({
    name: 'myapp_http_request_duration_seconds',
    help: 'Duration of HTTP requests in my app',
    labelNames: ['method', 'route', 'statusCode'],
    buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10],
});
register.registerMetric(http_request_counter);
register.registerMetric(http_request_duration);
const CustomMetric = (req, res, next) => {
    http_request_counter.labels({ method: req.method, route: req.originalUrl, statusCode: res.statusCode }).inc();
    next();
};
exports.CustomMetric = CustomMetric;
