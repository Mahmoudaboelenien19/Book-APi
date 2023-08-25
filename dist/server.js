"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_js_1 = require("./config.js");
const mongoose_1 = __importDefault(require("mongoose"));
const ErrorMiddleWare_js_1 = require("./middlewares/ErrorMiddleWare.js");
const booksRoutes_js_1 = __importDefault(require("./handlers/booksRoutes.js"));
const usersRoutes_js_1 = __importDefault(require("./handlers/usersRoutes.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default.connect(config_js_1.MONGOOSE_URL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/books", booksRoutes_js_1.default);
app.use("/users", usersRoutes_js_1.default);
app.use("/", (_, res) => {
    throw new Error(" this route not found");
});
app.use(ErrorMiddleWare_js_1.ErrorMiddleWare);
app.listen(config_js_1.PORT, () => {
    console.log("server starts");
});
