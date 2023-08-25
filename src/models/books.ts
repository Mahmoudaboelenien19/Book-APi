import bookCollection from "../schema/books.js";

export class Books {
  async create(book: BookInterface) {
    try {
      const newBook = await bookCollection.create(book);
      return newBook;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
