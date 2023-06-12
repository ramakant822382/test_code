import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ramakantsharma822382:ramakant@cluster0.dlwjxlj.mongodb.net/demo"
    );

    console.log(`Conected mongo DB Database`.bgGreen);
  } catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
  }
};
export default connectDB;
