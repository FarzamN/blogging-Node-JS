import chalk from "chalk";
import { connect } from "mongoose";
import { config } from "dotenv";

config();
const Dbcon = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log(chalk.hex("#DEADED").italic("MongoDB connected"));
  } catch (error) {
    console.log(chalk.hex("#ff5252").italic(`MongoDB error: 💥💥💥� ${error}`));
  }
};

export { Dbcon };
