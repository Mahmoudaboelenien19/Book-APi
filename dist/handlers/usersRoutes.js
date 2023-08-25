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
const user_1 = require("../models/user");
const generateTokens_1 = require("../lib/generateTokens");
const Auth_1 = require("../middlewares/Auth");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const createdUser = yield user_1.userModel.create(user);
        res.status(200).json({
            user: createdUser,
            message: "user is Sussessfully created",
        });
    }
    catch (err) {
        next(err);
    }
});
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const check = yield user_1.userModel.authenticate(user);
        if (check) {
            (0, generateTokens_1.generateTokens)(user.email, res);
            res.status(200).json({
                message: "you successfully logged in",
            });
        }
        else {
            res.status(404).json({
                message: "password is wrong",
            });
        }
    }
    catch (err) {
        next(err);
    }
});
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true,
        });
        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true,
        });
        res.status(200).json({
            message: "you successfully logged out",
        });
    }
    catch (err) {
        next(err);
    }
});
const userRouter = (0, express_1.Router)();
userRouter.post("/create", createUser);
userRouter.post("/authenticate", authenticate);
userRouter.delete("/logout", Auth_1.auth, logout);
exports.default = userRouter;
