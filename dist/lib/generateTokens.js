"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (email, res) => {
    const accessToken = jsonwebtoken_1.default.sign({ email }, config_1.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
    const refToken = jsonwebtoken_1.default.sign({ email }, config_1.REFRESH_TOKEN_SECRET, { expiresIn: "1y" });
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
    });
    res.cookie("refresh_token", refToken, {
        httpOnly: true,
        secure: true,
    });
};
exports.generateTokens = generateTokens;
