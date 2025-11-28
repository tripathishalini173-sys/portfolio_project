import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import {connectDB} from './config/Db.js'


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Contact Form API Route
app.use("/api/contact", contactRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${5000}`));
