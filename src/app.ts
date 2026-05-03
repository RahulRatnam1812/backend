import express from "express";
import { userRoute } from "./routes/userRoute";
import { authRoute } from "./routes/authentication";
import { customResponseHandler, notFound } from "./errorHandling/errorHandling";

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customResponseHandler);

app.use('/v1/users',userRoute);
app.use('/v1/auth',authRoute);

app.get('/', async (_req, res) => {
  res.status(200).json({ message: 'customer details api is running successfully.' });
});

app.use(notFound)