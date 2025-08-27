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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const user_1 = __importDefault(require("../models/user"));
const argon2_1 = __importDefault(require("argon2"));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'userName', passwordField: 'password' }, (userName, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({
            where: { user_name: userName }
        });
        if (!user)
            return done(null, true, { message: 'Invalid userName.' });
        const match = yield argon2_1.default.verify(user.password, password);
        if (!match)
            return done(null, true, { message: 'Incorrect password.' });
        return done(user, false, { message: 'Login successful.' });
    }
    catch (error) {
        return done(error, true, { message: 'Internal server error.' });
    }
})));
exports.default = passport_1.default;
