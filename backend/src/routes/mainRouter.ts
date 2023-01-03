import { Router } from "express";
import authRouter from "./authRouter";
import testRouter from "./testRouter";

const mainRouter = Router();

if(process.env.NODE_ENV === "test"){
  mainRouter.use(testRouter);
};
mainRouter.use(authRouter);


export default mainRouter;