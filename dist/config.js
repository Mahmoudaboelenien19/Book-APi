"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_SECRET = exports.ACCESS_TOKEN_SECRET = exports.SALT = exports.BCRYPT_PASS = exports.PORT = exports.MONGOOSE_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.MONGOOSE_URL = _a.MONGOOSE_URL, exports.PORT = _a.PORT, exports.BCRYPT_PASS = _a.BCRYPT_PASS, exports.SALT = _a.SALT, exports.ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, exports.REFRESH_TOKEN_SECRET = _a.REFRESH_TOKEN_SECRET;
