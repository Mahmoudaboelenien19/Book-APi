import { ObjectId } from "mongodb";

export const checkObjectID = (id: ObjectId) => {
  return ObjectId.isValid(id);
};
