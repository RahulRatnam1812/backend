import express from 'express';
import 'reflect-metadata';
import { userRoute } from './routes/userRoute';
import session from 'express-session'
import { ACCESS_KEY, PORT } from './config/app.config';
import passport from 'passport';
import { authRoute } from './routes/authentication';
import "../src/config/redis"
import  {customResponseHandler, notFound, routeErrors}  from './errorHandling/errorHandling';
import cors from 'cors';
// import { Sequelize } from 'sequelize';
import VerificationOtp from './models/verificationOtp';
import { Sequelize } from "sequelize-typescript";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customResponseHandler)
app.use(cors());

app.use(session({
  secret:ACCESS_KEY,
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize())
app.use(passport.session());

app.get('/', async (_req, res) => {
  try {
    // const users = await User.findAll();
    res.status(200).json({message:'customer details api is running successfully.'});
  } catch (error) {
    res.json({message:'something went wrong'})
  }
});

app.use('/v1/users',userRoute);
app.use('/v1/auth',authRoute);


app.use(routeErrors);
app.use(notFound);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    models: [User,VerificationOtp]
  }
);

export default sequelize;

app.use(notFound)
