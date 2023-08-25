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
            const user = jsonwebtoken_1.default.verify(token, config_js_1.ACCESS_TOKEN_SECRET);
            if (user) {
                next();
            }
            else {
                throw new Error("Invalid token");
            }
        }
        else {
            throw new Error("not Authorized !");
        }
    }
    catch (err) {
        if (err.name === "TokenExpiredError") {
            const refToken = req.headers["ref_token"];
            if (refToken) {
                const user = jsonwebtoken_1.default.verify(refToken, config_js_1.REFRESH_TOKEN_SECRET);
                if (user === null || user === void 0 ? void 0 : user.email) {
                    (0, generateTokens_js_1.generateTokens)(user.email, res);
                    next();
                }
                else {
                    throw new Error("Invalid token");
                }
            }
            else {
                throw new Error("add refresh token as ref_token header");
            }
        }
        else {
            throw new Error(err.message);
        }
    }
};
exports.auth = auth;
