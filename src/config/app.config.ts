import  dotenv  from "dotenv";
dotenv.config()
export const ACCESS_KEY = process.env.ACCESS_KEY || ''
export const DB_USER = process.env.DB_USER || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || ''
export const DB_DATABASE = process.env.DB_DATABASE || ''
export const PORT = process.env.PORT || 3001
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ''
export const JWT_REFRESH_SECRET_KEY = process.env.JWT_REFRESH_SECRET_KEY || ''