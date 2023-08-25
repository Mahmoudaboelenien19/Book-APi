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
const bookModel = new books_js_1.Books();
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
const BookRouter = (0, express_1.Router)();
BookRouter.route("/create").post(addBook);
exports.default = BookRouter;
