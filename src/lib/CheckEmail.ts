import { UserInterface } from "../interfaces/user.interface";
import UserCollection from "../schema/user";

export const CheckEmail = async (email: string) => {
  const result = await UserCollection.findOne({ email });
  return result;
};
