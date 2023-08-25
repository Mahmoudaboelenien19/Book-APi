import dotenv from "dotenv";
dotenv.config();

export const {
  MONGOOSE_URL,
  PORT,
  BCRYPT_PASS,
  SALT,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = process.env;
