import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/userRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();
const port = process.env.PORT
const app = express();

connectDB();

app.use(cors()); 
app.use(bodyParser.json());
app.use(express.json());

app.use("/app/student", studentRoutes);
app.use("/app/assignment", assignmentRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started at port ${port}`));
