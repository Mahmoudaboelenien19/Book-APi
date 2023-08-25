import express, { Request, Response } from "express";
import { MONGOOSE_URL, PORT } from "./config.js";
import mongoose from "mongoose";
import { ErrorMiddleWare } from "./middlewares/ErrorMiddleWare.js";
import BookRouter from "./handlers/booksRoutes.js";
import userRouter from "./handlers/usersRoutes.js";
import cookieParser from "cookie-parser";
mongoose.connect(MONGOOSE_URL as unknown as string);

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/books", BookRouter);
app.use("/users", userRouter);
app.use("/", (_: Request, res: Response) => {
  throw new Error(" this route not found");
});
app.use(ErrorMiddleWare);
app.listen(PORT, () => {
  console.log("server starts");
});
