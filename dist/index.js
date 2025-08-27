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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
require("reflect-metadata");
const userRoute_1 = require("./routes/userRoute");
const express_session_1 = __importDefault(require("express-session"));
const app_config_1 = require("./config/app.config");
const passport_1 = __importDefault(require("passport"));
const authentication_1 = require("./routes/authentication");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: app_config_1.ACCESS_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await User.findAll();
        res.status(200).json({ message: 'customer details api is running successfully.' });
    }
    catch (error) {
        res.json({ message: 'something went wrong' });
    }
}));
app.use('/v1/users', userRoute_1.userRoute);
app.use('/v1/auth', authentication_1.authRoute);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
database_1.default
    .sync()
    .then(() => {
    console.log('Database synced');
    app.listen(app_config_1.PORT, () => console.log(`Server running on port ${app_config_1.PORT}`));
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
