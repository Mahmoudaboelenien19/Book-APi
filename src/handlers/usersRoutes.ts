import { NextFunction, Request, Response, Router } from "express";
import { userModel } from "../models/user";
import { generateTokens } from "../lib/generateTokens";
import { auth } from "../middlewares/Auth";
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

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
    });
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
    });
    res.status(200).json({
      message: "you successfully logged out",
    });
  } catch (err) {
    next(err);
  }
};
const userRouter = Router();
userRouter.post("/create", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.delete("/logout", auth, logout);
export default userRouter;
