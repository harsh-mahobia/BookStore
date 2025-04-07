import Prometheus from 'prom-client';
import {Request, Response, NextFunction} from 'express';

const register = new Prometheus.Registry();

register.setDefaultLabels({
  app: 'example-nodejs-app',
});

Prometheus.collectDefaultMetrics({ register });

const http_request_counter = new Prometheus.Counter({
  name: 'myapp_http_request_count',
  help: 'Count of HTTP requests made to my app',
  labelNames: ['method', 'route', 'statusCode'],
});

const http_request_duration = new Prometheus.Histogram({
  name: 'myapp_http_request_duration_seconds',
  help: 'Duration of HTTP requests in my app',
  labelNames: ['method', 'route', 'statusCode'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 3, 5, 10],
});

register.registerMetric(http_request_counter);
register.registerMetric(http_request_duration);

const CustomMetric = (req : Request, res : Response, next : NextFunction) => {
  
  http_request_counter.labels({ method: req.method, route: req.originalUrl, statusCode: res.statusCode }).inc();

  next();
};

export { register, CustomMetric };
