"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleWare = void 0;
const ErrorMiddleWare = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    res.status(status).json({
        message,
    });
};
exports.ErrorMiddleWare = ErrorMiddleWare;
