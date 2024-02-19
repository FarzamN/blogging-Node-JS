import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./src/routes/userRoute.js";

config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 8010;
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error("Error in connecting to MongoDB:", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
process.on("SIGINT", () => {
  db.close(() => {
    console.log("Mongoose connection disconnected through app termination");
    process.exit(0);
  });
});

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`Blogging app listening on port ${port}!`));
