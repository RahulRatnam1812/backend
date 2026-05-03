import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/database";
import { types } from 'pg';
import User from "./user";

types.setTypeParser(20, (val: string) => parseInt(val, 10));

const connection:any = new Sequelize({
    dialect: "postgres",
    host: dbConfig.host,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    pool:dbConfig.pool,
    logging: false,
    timezone: "+00:00",
    models: [
      User
    ]
});

export default connection;