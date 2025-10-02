"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.AuthController = void 0;
const user_1 = __importDefault(require("../models/user"));
const argon2_1 = __importDefault(require("argon2"));
const passport_config_1 = __importDefault(require("../config/passport.config"));
// import AuthenticationService from "../services/Auth/AuthenticationService";
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const app_config_1 = require("../config/app.config");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userName, password } = req.body;
                // const authentication = new AuthenticationService()
                // authentication.loginUser(userName,password)
                passport_config_1.default.authenticate('local', { session: false }, (user, err, info) => {
                    if (!user) {
                        return res.status(403).json({ message: (info === null || info === void 0 ? void 0 : info.message) || 'Invalid credentials' });
                    }
                    if (err) {
                        return res.status(500).json({ message: 'Server error', error: err });
                    }
                    const parameter = {
                        userId: user.id
                    };
                    const token = jsonwebtoken_1.default.sign(parameter, app_config_1.JWT_SECRET_KEY, { expiresIn: '1D' });
                    const refreshToken = jsonwebtoken_1.default.sign(parameter, app_config_1.JWT_REFRESH_SECRET_KEY, { expiresIn: '7D' });
                    return res.status(200).json({
                        message: (info === null || info === void 0 ? void 0 : info.message) || 'Login successful',
                        token: {
                            accessToken: token,
                            refreshToken: refreshToken
                        }
                    });
                })(req, res);
                let message;
                // if(response){
                //     res.status(200).json({
                //         message:'User logged in successfully.'
                //     })
                // } else{
                //     res.status(403).json({
                //         message:'Invalid username or password.'
                //     })
                // }
            }
            catch (error) {
                console.log("error", error);
                res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
    static refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                const decoded = jsonwebtoken_1.default.verify(refreshToken, app_config_1.JWT_REFRESH_SECRET_KEY);
                const userId = decoded.userId;
                const parameter = {
                    userId: userId
                };
                const accessToken = jsonwebtoken_1.default.sign(parameter, app_config_1.JWT_SECRET_KEY, { expiresIn: '1D' });
                const newRefreshToken = jsonwebtoken_1.default.sign(parameter, app_config_1.JWT_REFRESH_SECRET_KEY, { expiresIn: '1s' });
                return res.status(200).json({
                    message: 'Success',
                    token: {
                        accessToken: accessToken,
                        refreshToken: newRefreshToken
                    }
                });
            }
            catch (error) {
                console.log("error", error);
                if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res.status(401).json({ message: 'Refresh token expired.' });
                }
                if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
                    return res.status(401).json({ message: 'Invalid Refresh token.' });
                }
            }
        });
    }
    static createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestData = req.body;
                const { firstName, lastName, userName, password, email } = requestData;
                const hashPassword = yield argon2_1.default.hash(password);
                console.log("hashPassword", hashPassword);
                const response = yield user_1.default.create({
                    first_name: firstName,
                    last_name: lastName,
                    user_name: userName,
                    password: hashPassword,
                    email: email
                });
                res.status(200).json({
                    success: true,
                    message: 'User created successfully.'
                });
            }
            catch (error) {
                console.log("error", error);
                res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
    static forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestData = req.body;
                const { firstName, lastName, userName, password } = requestData;
                res.status(200).json({
                    success: true,
                    message: 'User created successfully.'
                });
            }
            catch (error) {
                console.log("error", error);
                res.status(500).json({ message: 'Something went wrong.' });
            }
        });
    }
}
exports.AuthController = AuthController;
