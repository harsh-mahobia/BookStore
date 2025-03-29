import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';


import errorHandler from "./middlewares/error_handler";
import auth from "./routes/auth"
import book from "./routes/book"
import connectDB from './database/connection';
import cors from 'cors';



dotenv.config();


const app: Application = express();
const port = process.env.PORT || 8000;

connectDB()

app.use(express.json())

app.use(cors({
  origin : "*",
}))

app.get('/', (req: Request, res: Response) => {
  res.send(' Server running');
});


app.use("/api", auth);
app.use("/api", book);


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
});