import { Response } from "express";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import jwt from "jsonwebtoken";
export const generateTokens = (email: string, res: Response) => {
  const accessToken = jwt.sign(
    { email },
    ACCESS_TOKEN_SECRET as unknown as string,
    { expiresIn: "15s" }
  );

  const refToken = jwt.sign(
    { email },
    REFRESH_TOKEN_SECRET as unknown as string,
    { expiresIn: "1y" }
  );

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: true,
  });
  res.cookie("refresh_token", refToken, {
    httpOnly: true,
    secure: true,
  });
};
