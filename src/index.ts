import express from 'express';
import sequelize from './config/database';
import User from './models/user';
import 'reflect-metadata';
import { userRoute } from './routes/userRoute';
import session from 'express-session'
import { ACCESS_KEY, PORT } from './config/app.config';
import passport from 'passport';

const app = express();
app.use(express.json());

app.use(session({
  secret:ACCESS_KEY,
  resave:false,
  saveUninitialized:false
}));

app.use(passport.initialize())
app.use(passport.session())

app.get('/', async (_req, res) => {
  try {
    // const users = await User.findAll();
    res.status(200).json({message:'customer details api is running successfully.'});
  } catch (error) {
    res.json({message:'something went wrong'})
  }
});

app.use('/v1/users',userRoute);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
