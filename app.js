import express from "express";
import { config } from "dotenv";
import { Dbcon } from "./src/db/db.js";
import authRoutes from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";

config();
Dbcon();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8010;

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", authRoutes);
app.use("/user", userRoute);

app.listen(port, () => console.log(`Blogging app listening on port ${port}!`));
