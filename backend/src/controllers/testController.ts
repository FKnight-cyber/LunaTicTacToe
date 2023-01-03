import { Request, Response } from "express";
import prisma from "../databases/prisma";

export default async function cleanPlayersTable(req:Request, res:Response){
    await prisma.player.deleteMany({});
    res.sendStatus(203);
}