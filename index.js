import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./ConnectDb.js";
import userRoutes from "./routes/user.js";

const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Welcome Mearn Stack Project </h1>");
});

app.use("/user", userRoutes);
//RUN LISTEN
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server Running on POrt ${PORT}`.bgCyan.white);
});
