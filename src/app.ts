import express from "express";
import { userRoute } from "./routes/userRoute";
import { authRoute } from "./routes/authentication";
import { notFound } from "./errorHandling/errorHandling";
// import cors from "cors";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

app.use('/v1/users',userRoute);
app.use('/v1/auth',authRoute);

app.get('/', async (_req, res) => {
  try {
    // const users = await User.findAll();
    res.status(200).json({message:'customer details api is running successfully.'});
  } catch (error) {
    res.json({message:'something went wrong'})
  }
});

app.use(notFound)