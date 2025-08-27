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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authentication')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    try {
        if (!token) {
            return res.errorResponse({
                status: 401,
                message: "Access Denied."
            });
        }
        const verify = jsonwebtoken_1.default.verify(token, app_config_1.JWT_SECRET_KEY);
        if (!verify) {
            return res.errorResponse({
                status: 401,
                message: "Invalid Authentication"
            });
        }
        const jwtData = jsonwebtoken_1.default.decode(token);
        const user = jwtData;
        //   req.user = jwtData
        next();
    }
    catch (error) {
        console.log("middle error", error);
    }
});
