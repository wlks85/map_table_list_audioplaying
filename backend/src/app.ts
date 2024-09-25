import express from "express";
import { UploadController } from "./controllers/UploadController";
import mongoose from "mongoose";
import WordsRouter from "./router/WordsRouter";
import cors from "cors";
import { asyncHandler } from "./middlewares";
import categoryRoute from "./router/categoryRoute";
import audioRoute from "./router/audioRoute";

const MONGO_URL =
  process.env.MONGO_URL || "mongodb://host.docker.internal:27017/wordmap";

// mongoose.connect(MONGO_URL)

mongoose
  .connect("mongodb://127.0.0.1:27017/wordmap", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const upController = new UploadController();

const app = express();

const corsOptions = {
  origin: "*", // Replace with your allowed origin(s)
  methods: ["GET", "POST"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};

// Enable CORS with custom options
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (_, res) => res.json("Hello from api..."));

/**
 * Words api
 */
app.use("/api/v1/words", WordsRouter);

/** CategoryApi */
app.use("/api/v1/categories", categoryRoute);

/** audioApi */
app.use("/api/v1/audios", audioRoute);

app.get(
  "/import/meta",
  asyncHandler(async (req, res) => {
    await upController.processMetaFile();
    res.json({ hello: "meta imported." });
  })
);

app.get(
  "/import/:word",
  asyncHandler((req, res) => {
    const title = req.params.word;
    upController.importWord(title);
    res.json({ message: "Word imported." });
  })
);





export default app;
