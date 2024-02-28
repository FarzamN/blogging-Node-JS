import express from "express";
import { config } from "dotenv";
import {
  authRoute,
  productRouter,
  userRoute,
  categoryRouter,
} from "./src/routes/index.js";
import { Dbcon } from "./src/Config/Configration.js";
import chalk from "chalk";

config();
Dbcon();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8010;

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.listen(port, () =>
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Blogging app listening on port",
      chalk.bgHex("#FFA500").hex("#000")(`${port}!`)
    )
  )
);
