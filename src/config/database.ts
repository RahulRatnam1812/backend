import { Sequelize } from "sequelize-typescript";
import User from "../models/user";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./app.config";

if (!DB_DATABASE || !DB_USER || !DB_HOST) {
  throw new Error(
    `❌ Missing DB config — DB_DATABASE: ${DB_DATABASE}, DB_USER: ${DB_USER}, DB_HOST: ${DB_HOST}`
  );
}

export const sequelize = new Sequelize(
    {
        database: DB_DATABASE,
        username: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        dialect: 'postgres',
        port: 5432,
        models: [User]
    });

