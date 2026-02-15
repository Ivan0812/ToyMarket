import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import mongoose from "mongoose";
import toyRoutes from "./routes/toyRoutes.js";

dotenv.config();

const app = express();

app.use("/images", express.static("images"));
app.use(cors());
app.use(express.json());

app.use("/api/toys", toyRoutes);
app.use("/api/orders", orderRoutes);

// app.js ili server.js
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`, req.body);
    next();
  });

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
    res.send("API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
