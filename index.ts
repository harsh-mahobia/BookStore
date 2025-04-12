import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { register } from './monitoring/prometheus';

import errorHandler from "./middlewares/error_handler";
import auth from "./routes/auth"
import book from "./routes/book"
import connectDB from './database/connection';
import cors from 'cors';
import rateLimit from 'express-rate-limit';





const ratelimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message : "You have reached your maximum request limit for this time period, try after 15 mins",
})

dotenv.config();


const app: Application = express();
const port = process.env.PORT || 8000;

connectDB()

app.use(ratelimiter);
app.use(express.json())

app.use(cors({
  origin : "*",
}))

app.get('/', (req: Request, res: Response) => {
  res.send(' Server running');
});


app.get('/metrics', async (req: Request, res: Response) => {
  res.setHeader('Content-Type', register.contentType);

  try {
    const data = await register.metrics();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching metrics');
  }
});


app.use("/api", auth);
app.use("/api", book);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});