import { ObjectId } from "mongodb";
import bookCollection from "../schema/books.js";
import { checkObjectID } from "../lib/checkObjectID.js";

export class Books {
  async index() {
    try {
      return await bookCollection.find({});
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  async create(book: BookInterface) {
    try {
      const newBook = await bookCollection.create(book);
      return newBook;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async update(book: BookInterface, id: ObjectId) {
    try {
      const check = checkObjectID(id);

      if (check) {
        const updatedBook = await bookCollection.findByIdAndUpdate(
          id,
          {
            ...book,
          },
          { new: true }
        );
        return updatedBook;
      } else {
        throw new Error("invaild  book id");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  async get(id: ObjectId) {
    const check = checkObjectID(id);
    try {
      if (check) {
        return await bookCollection.findById(id);
      } else {
        throw new Error("invaild  book id");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  async delete(id: ObjectId) {
    const check = checkObjectID(id);
    try {
      if (check) {
        const res = await bookCollection.findByIdAndDelete(id);
        console.log(res);
        return res;
      } else {
        throw new Error("invaild  book id");
      }
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
