import express from 'express';
// import Sequelize from './config/database';
import User from './models/user';
import 'reflect-metadata';
import { userRoute } from './routes/userRoute';
import session from 'express-session'
import { ACCESS_KEY, PORT } from './config/app.config';
import passport from 'passport';
import { authRoute } from './routes/authentication';
import "../src/config/redis"
import  {customResponseHandler, notFound}  from './errorHandling/errorHandling';
import { Sequelize } from 'sequelize';


const app = express();
app.use(express.json());

app.use(session({
  secret:ACCESS_KEY,
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize())
app.use(passport.session());
app.use(customResponseHandler)

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
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USERNAME as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
  }
);

export default sequelize;

app.use(notFound)