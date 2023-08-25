import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";
import { generateTokens } from "../lib/generateTokens.js";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHearders = req.headers.authorization;

    if (authHearders) {
      const token = authHearders!.split(" ")[1];

      const decode = Jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as unknown as string
      );
      if (decode) {
        next();
      } else {
        throw new Error("Invalid token");
      }
    } else {
      throw new Error("expired token");
    }
  } catch (err) {
    if ((err as Error).name === "TokenExpiredError") {
      const refToken = req.headers["ref_token"];

      if (refToken) {
        const decode = Jwt.verify(
          refToken as unknown as string,
          REFRESH_TOKEN_SECRET as unknown as string
        ) as unknown as { email: string };
        if (decode?.email) {
          generateTokens(decode.email, res);
          next();
        } else {
          throw new Error("Invalid token");
        }
      }
    } else {
      throw new Error((err as Error).message);
    }
  }
};
