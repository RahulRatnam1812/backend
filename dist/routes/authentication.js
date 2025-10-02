"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
exports.authRoute = express_1.default.Router();
exports.authRoute.post('/login', AuthController_1.AuthController.login);
exports.authRoute.post('/refresh-token', AuthController_1.AuthController.refreshToken);
exports.authRoute.post('/create-user', AuthController_1.AuthController.createAccount);
exports.authRoute.post('/forgot-password', AuthController_1.AuthController.forgotPassword);
