import { NextFunction, Request, Response, Router } from "express";
import { userModel } from "../models/user";
import { generateTokens } from "../lib/generateTokens";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const createdUser = await userModel.create(user);
    res.status(200).json({
      user: createdUser,
      message: "user is Sussessfully created",
    });
  } catch (err) {
    next(err);
  }
};

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const check = await userModel.authenticate(user);
    if (check) {
      generateTokens(user.email, res);
      res.status(200).json({
        message: "you successfully logged in",
      });
    } else {
      res.status(404).json({
        message: "password is wrong",
      });
    }
  } catch (err) {
    next(err);
  }
};
const userRouter = Router();
userRouter.post("/create", createUser);
userRouter.post("/authenticate", authenticate);
export default userRouter;
