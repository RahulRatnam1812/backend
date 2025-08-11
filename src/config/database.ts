import { Sequelize } from "sequelize-typescript";
import User from "../models/user";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./app.config";


const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    {
    host:DB_HOST,
    dialect:'mysql', 
    models:[User]
});

export default sequelize;