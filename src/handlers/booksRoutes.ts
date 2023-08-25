import { NextFunction, Request, Response, Router } from "express";
import { Books } from "../models/books.js";
const bookModel = new Books();
const addBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book: BookInterface = req.body;

    const result = await bookModel.create(book);
    res.status(200).json({
      message: "Book added successfully",
      book: result,
    });
  } catch (err) {
    next(err);
  }
};

const BookRouter = Router();

BookRouter.route("/create").post(addBook);
export default BookRouter;
