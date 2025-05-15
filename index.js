import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import userRoute from "./server/routes/user.js";
import entryRoute from "./server/routes/entry.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5500;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => { res.send('Hello from Express!') });


app.use(cookieParser())
app.use(express.json());
app.use(helmet());


const __dirname = path.resolve();

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(cors({
   origin: "http://localhost:3000",
   credentials: true
}))



app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);

app.listen(PORT, () => {
  console.log("Listening on port 5500");
  connect();
});