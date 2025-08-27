"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("../models/user"));
const app_config_1 = require("./app.config");
const sequelize = new sequelize_typescript_1.Sequelize(app_config_1.DB_DATABASE, app_config_1.DB_USER, app_config_1.DB_PASSWORD, {
    host: app_config_1.DB_HOST,
    dialect: 'mysql',
    models: [user_1.default]
});
exports.default = sequelize;
