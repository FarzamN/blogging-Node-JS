import mongoose from "mongoose";
import chalk from "chalk";

const Dbcon = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      chalk.cyan.underline(`MongoDB connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.log(error);
  }
};

export { Dbcon };
