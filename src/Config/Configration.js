import { connect } from "mongoose";
import chalk from "chalk";

const Dbcon = async () => {
  try {
    const conn = await connect(process.env.MONGO_URL);
    console.log(
      chalk.hex("#DEADED").italic`MongoDB connected: ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export { Dbcon };
