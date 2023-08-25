"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_js_1 = require("../config.js");
const generateTokens_js_1 = require("../lib/generateTokens.js");
const auth = (req, res, next) => {
    try {
        const authHearders = req.headers.authorization;
        if (authHearders) {
            const token = authHearders.split(" ")[1];
            const decode = jsonwebtoken_1.default.verify(token, config_js_1.ACCESS_TOKEN_SECRET);
            if (decode) {
                next();
            }
            else {
                throw new Error("Invalid token");
            }
        }
        else {
            throw new Error("expired token");
        }
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            const refToken = req.headers["ref_token"];
            if (refToken) {
                const decode = jsonwebtoken_1.default.verify(refToken, config_js_1.REFRESH_TOKEN_SECRET);
                if (decode === null || decode === void 0 ? void 0 : decode.email) {
                    (0, generateTokens_js_1.generateTokens)(decode.email, res);
                    next();
                }
                else {
                    throw new Error("Invalid token");
                }
            }
        }
        else {
            throw new Error(err.message);
        }
    }
};
exports.auth = auth;
