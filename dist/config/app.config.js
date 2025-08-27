"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_REFRESH_SECRET_KEY = exports.JWT_SECRET_KEY = exports.PORT = exports.DB_DATABASE = exports.DB_HOST = exports.DB_PASSWORD = exports.DB_USER = exports.ACCESS_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ACCESS_KEY = process.env.ACCESS_KEY || '';
exports.DB_USER = process.env.DB_USER || '';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_HOST = process.env.DB_HOST || '';
exports.DB_DATABASE = process.env.DB_DATABASE || '';
exports.PORT = process.env.PORT || 3001;
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';
exports.JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || '';
