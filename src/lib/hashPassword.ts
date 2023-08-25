import bcrypt from "bcrypt";
import { BCRYPT_PASS } from "../config";
export const hashPassword = async (password: string) => {
  return bcrypt.hashSync(password + BCRYPT_PASS, 10);
};
