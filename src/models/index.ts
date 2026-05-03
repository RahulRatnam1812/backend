import { Sequelize } from "sequelize-typescript";
import User from "./user";
import { types } from 'pg';
import { ENV } from "../config/env.config";



// ✅ Global override for PostgreSQL BIGINT (OID 20)
types.setTypeParser(20, (val: string) => Number.parseInt(val, 10));

const connection: any = new Sequelize({
  dialect: "postgres",
  host: ENV.database.HOST,
  username: ENV.database.USER,
  password: ENV.database.PASSWORD,
  database: ENV.database.DB,
  pool: ENV.database.pool,
  logging: false,
  timezone: '+00:00',
  /* sync:{
    force:true,
  }, */
  models: [
    User
  ],
});

export default connection;
