import { Router } from "express";
import { signIn, signUp } from "../controllers/authController";
import authValidation from "../middlewares/authValidation";

const authRouter = Router();

authRouter.post("/sign-up", authValidation, signUp);
authRouter.post("/sign-in", authValidation, signIn);

export default authRouter;