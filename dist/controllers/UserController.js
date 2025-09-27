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
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const redis_1 = __importDefault(require("../config/redis"));
class UserController {
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield user_1.default.findAll();
                console.log("resp", resp);
                return res.status(200).json({
                    data: resp,
                    message: 'User response successful.'
                });
            }
            catch (error) {
                return res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
    static getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                let resp = yield redis_1.default.get(`user:${id}`);
                resp = resp ? JSON.parse(resp) : null;
                if (!resp) {
                    console.log("first");
                    resp = yield user_1.default.findOne({
                        where: { id: id }
                    });
                    yield redis_1.default.set(`user:${id}`, JSON.stringify(resp));
                }
                return res.status(200).json({
                    data: resp,
                    message: 'User response successful.'
                });
            }
            catch (error) {
                return res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
}
exports.UserController = UserController;
