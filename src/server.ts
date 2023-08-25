import express, { Request, Response } from "express";
import { MONGOOSE_URL, PORT } from "./config.js";
import mongoose from "mongoose";
import { ErrorMiddleWare } from "./middlewares/ErrorMiddleWare.js";
mongoose.connect(MONGOOSE_URL as unknown as string);

const app = express();
app.use(express.json());

app.use("/", (_: Request, res: Response) => {
  res.status(404).json({
    message: "wrong route",
  });
});
app.use(ErrorMiddleWare);
app.listen(PORT, () => {
  console.log("server starts");
});
