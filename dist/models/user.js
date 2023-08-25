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
exports.userModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const CheckEmail_1 = require("../lib/CheckEmail");
const hashPassword_1 = require("../lib/hashPassword");
const user_1 = __importDefault(require("../schema/user"));
const config_1 = require("../config");
class User {
    create(user) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const check = yield (0, CheckEmail_1.CheckEmail)(user.email);
                if (!check) {
                    if ((_a = user === null || user === void 0 ? void 0 : user.password) === null || _a === void 0 ? void 0 : _a.match(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)) {
                        const result = yield user_1.default.create(Object.assign(Object.assign({}, user), { password: yield (0, hashPassword_1.hashPassword)(user.password) }));
                        return result;
                    }
                    else {
                        throw new Error("Password must include at least one letter, one number, and one special character and at least 8 characters");
                    }
                }
                else {
                    throw new Error("user is already registered");
                }
            }
            catch (err) {
                throw new Error(err.message);
            }
        });
    }
    authenticate(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const check = yield (0, CheckEmail_1.CheckEmail)(user.email);
            if (check === null || check === void 0 ? void 0 : check._id) {
                const checkPassword = bcrypt_1.default.compareSync(user.password + config_1.BCRYPT_PASS, check.password);
                return checkPassword;
            }
            else {
                throw new Error("this email is not registered");
            }
        });
    }
}
exports.userModel = new User();
