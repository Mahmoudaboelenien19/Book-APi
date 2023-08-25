"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const booksSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        minLength: 4,
        maxLength: 50,
    },
    author: {
        type: String,
        minLength: 4,
        maxLength: 20,
    },
    price: {
        type: Number,
        min: 5,
        max: 150,
    },
    pages: {
        type: Number,
        min: 400,
        max: 2000,
    },
    stock: {
        type: Number,
        min: 1,
        max: 500,
    },
});
exports.default = mongoose_1.default.model("Book", booksSchema);
