"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const books_js_1 = require("../models/books.js");
const Auth_js_1 = require("../middlewares/Auth.js");
const bookModel = new books_js_1.Books();
const getALlBooks = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookModel.index();
        res.status(200).json({
            message: "Books fetched successfully",
            books: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield bookModel.create(book);
        res.status(200).json({
            message: "Book added successfully",
            book: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = req.body;
        const result = yield bookModel.update(book, req.params.id);
        res.status(200).json({
            message: "Book updated  successfully",
            book: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const findBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookModel.get(req.params.id);
        res.status(200).json({
            message: "Book is   successfully found",
            book: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bookModel.delete(req.params.id);
        if (result) {
            res.status(200).json({
                message: "Book is   successfully deleted",
            });
        }
        else {
            res.status(404).json({
                message: "no book is  found",
            });
        }
    }
    catch (err) {
        next(err);
    }
});
const BookRouter = (0, express_1.Router)();
BookRouter.route("/").get(Auth_js_1.auth, getALlBooks);
BookRouter.route("/create").post(Auth_js_1.auth, addBook);
BookRouter.route("/:id")
    .patch(Auth_js_1.auth, updateBook)
    .get(Auth_js_1.auth, findBook)
    .delete(Auth_js_1.auth, deleteBook);
exports.default = BookRouter;
