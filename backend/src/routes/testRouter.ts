import { Router } from "express";
import cleanPlayersTable from "../controllers/testController";

const testRouter = Router();

testRouter.delete("/test/players/clear", cleanPlayersTable);

export default testRouter;