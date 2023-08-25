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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const books_js_1 = __importDefault(require("../schema/books.js"));
const checkObjectID_js_1 = require("../lib/checkObjectID.js");
class Books {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield books_js_1.default.find({});
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    create(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield books_js_1.default.create(book);
                return newBook;
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    update(book, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const check = (0, checkObjectID_js_1.checkObjectID)(id);
                if (check) {
                    const updatedBook = yield books_js_1.default.findByIdAndUpdate(id, Object.assign({}, book), { new: true });
                    return updatedBook;
                }
                else {
                    throw new Error("invaild  book id");
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = (0, checkObjectID_js_1.checkObjectID)(id);
            try {
                if (check) {
                    return yield books_js_1.default.findById(id);
                }
                else {
                    throw new Error("invaild  book id");
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = (0, checkObjectID_js_1.checkObjectID)(id);
            try {
                if (check) {
                    const res = yield books_js_1.default.findByIdAndDelete(id);
                    console.log(res);
                    return res;
                }
                else {
                    throw new Error("invaild  book id");
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
}
exports.Books = Books;
