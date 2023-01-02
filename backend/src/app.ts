import express, { json } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import mainRouter from "./routes/mainRouter";

const app = express();

app.use(json());
app.use(cors());
app.use(mainRouter);
app.use(errorHandler);

export default app;