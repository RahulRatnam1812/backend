"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
// import authM
exports.userRoute = express_1.default.Router();
exports.userRoute.use(authMiddleware_1.default);
exports.userRoute.get('/all-users', UserController_1.UserController.getAllUsers);
exports.userRoute.get('/user-details/:id', UserController_1.UserController.getUser);
