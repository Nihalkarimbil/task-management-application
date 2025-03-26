import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ErrorHandler from "./middleware/ErrorHandler";
import taskRouter from "./routes/taskRoutes";
import sectionRoute from "./routes/sectionRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const corsOption = {
  origin: process.env.FRONTEND_URI,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOption));
app.use(express.json());

app.use("/task", taskRouter);
app.use("/section", sectionRoute);

app.use(ErrorHandler);

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((error) => console.error("Database connection error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
