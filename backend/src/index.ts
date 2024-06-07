import express from 'express';
import { UploadController } from './controllers/UploadController';
import mongoose from 'mongoose';
import { asyncHandler, globalErrorHandler } from './middlewares';
import WordsRouter from './router/WordsRouter';
import cors from 'cors';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://host.docker.internal:27017/wordmap';

mongoose.connect(MONGO_URL)

const upController = new UploadController();

const app = express();
const port = process.env.PORT || 8000;


const corsOptions = {
  origin: '*', // Replace with your allowed origin(s)
  methods: ['GET', 'POST'], // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};

// Enable CORS with custom options
app.use(cors(corsOptions));

app.get("/", (_, res) => res.json("Hello from api..."));


/**
 * Words api
 */
app.use("/api/v1/words", WordsRouter)



app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
