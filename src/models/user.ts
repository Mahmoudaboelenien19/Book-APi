import bcrypt from "bcrypt";
import { UserInterface } from "../interfaces/user.interface";
import { CheckEmail } from "../lib/CheckEmail";
import { hashPassword } from "../lib/hashPassword";
import UserCollection from "../schema/user";
import { BCRYPT_PASS } from "../config";

class User {
  async create(user: UserInterface) {
    console.log(user);
    try {
      const check = await CheckEmail(user.email);
      if (!check) {
        if (
          user?.password?.match(
            /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
          )
        ) {
          const result = await UserCollection.create({
            ...user,
            password: await hashPassword(user.password),
          });
          return result;
        } else {
          throw new Error(
            "Password must include at least one letter, one number, and one special character and at least 8 characters"
          );
        }
      } else {
        throw new Error("user is already registered");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async authenticate(user: UserInterface) {
    const check = await CheckEmail(user.email);

    if (check?._id) {
      const checkPassword = bcrypt.compareSync(
        user.password + BCRYPT_PASS,
        check.password
      );
      return checkPassword;
    } else {
      throw new Error("this email is not registered");
    }
  }
}
export const userModel = new User();
