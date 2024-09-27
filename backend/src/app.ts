import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import recordRoutes from "./routes/recordRoutes";
import categoryRoutes from "./routes/categoryRoute";
import audioRoute from "./routes/audioRoutes";
import variantRoute from "./routes/variantRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Page Title Api
app.use("/api/pagetitle", recordRoutes);

/** CategoryApi */
app.use("/api/v1/categories", categoryRoutes);

// variant data
app.use("/api/v1/variant", variantRoute);

// Audio File API
app.use("/api/v1/audios", audioRoute);

app.get("/", (req, res) => {
  res.json("hello from api");
});

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });

export default app;
