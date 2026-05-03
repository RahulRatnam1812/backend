
require('dotenv').config();
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: 5432,
  dialect: 'postgres',
  // migrationStorage: "json",
  // migrationStoragePath: "sequelizeMeta.json",
  // migrationStorageTableName: "sequelize_meta",
  // migrationStorageTableSchema: "public"
  migrationStorage: "sequelize",
  migrationStorageTableName: "sequelize_meta",
  migrationStorageTableSchema: "public"
};
