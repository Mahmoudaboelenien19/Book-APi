import { Err } from "./../interfaces/Error.interface";
import { NextFunction, Request, Response, Router } from "express";
import { Books } from "../models/books.js";
import { ObjectId } from "mongodb";
import { auth } from "../middlewares/Auth.js";
const bookModel = new Books();

const getALlBooks = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookModel.index();
    res.status(200).json({
      message: "Books fetched successfully",
      books: result,
    });
  } catch (err) {
    next(err);
  }
};
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

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book: BookInterface = req.body;

    const result = await bookModel.update(
      book,
      req.params.id as unknown as ObjectId
    );
    res.status(200).json({
      message: "Book updated  successfully",
      book: result,
    });
  } catch (err) {
    next(err);
  }
};

const findBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookModel.get(req.params.id as unknown as ObjectId);
    res.status(200).json({
      message: "Book is   successfully found",
      book: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await bookModel.delete(req.params.id as unknown as ObjectId);
    if (result) {
      res.status(200).json({
        message: "Book is   successfully deleted",
      });
    } else {
      res.status(404).json({
        message: "no book is  found",
      });
    }
  } catch (err) {
    next(err);
  }
};

const BookRouter = Router();

BookRouter.route("/").get(auth, getALlBooks);
BookRouter.route("/create").post(auth, addBook);
BookRouter.route("/:id")
  .patch(auth, updateBook)
  .get(auth, findBook)
  .delete(auth, deleteBook);
export default BookRouter;
