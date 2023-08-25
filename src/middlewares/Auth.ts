import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";
import { generateTokens } from "../lib/generateTokens.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHearders = req.headers.authorization;

    if (authHearders) {
      const token = authHearders!.split(" ")[1];

      const user = Jwt.verify(token, ACCESS_TOKEN_SECRET as unknown as string);
      if (user) {
        next();
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("not Authorized !");
    }
  } catch (err) {
    if ((err as Error).name === "TokenExpiredError") {
      const refToken = req.headers["ref_token"];

      if (refToken) {
        const user = Jwt.verify(
          refToken as unknown as string,
          REFRESH_TOKEN_SECRET as unknown as string
        ) as unknown as { email: string };
        if (user?.email) {
          generateTokens(user.email, res);
          next();
        } else {
          throw new Error("Invalid token");
        }
      } else {
        throw new Error("add refresh token as ref_token header");
      }
    } else {
      throw new Error((err as Error).message);
    }
  }
};
