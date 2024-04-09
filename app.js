import chalk from "chalk";
import { config } from "dotenv";
import {
  authRoute,
  productRouter,
  userRoute,
  categoryRouter,
} from "./src/routes/index.js";
import express, { json, urlencoded } from "express";
import { Dbcon } from "./src/Config/Configration.js";

config();
Dbcon();

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
const port = process.env.PORT || 8010;

app.get("/", (_, res) => res.send("Blogging app!"));
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.listen(port, () =>
  console.log(
    chalk.bgHex("#193547").hex("#ecf4f8")(
      "Blogging app port",
      chalk.bgHex("#FFA500").hex("#000")(`http://localhost:${port}/`)
    )
  )
);
