"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkObjectID = void 0;
const mongodb_1 = require("mongodb");
const checkObjectID = (id) => {
    return mongodb_1.ObjectId.isValid(id);
};
exports.checkObjectID = checkObjectID;
