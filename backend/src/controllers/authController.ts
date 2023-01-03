import { Request, Response } from "express";
import authServices from "../services/authService";

export async function signUp(req:Request, res:Response) {
  const { username, password } : 
  { username:string, password:string } = req.body;

  await authServices.register({username, password});

  res.status(201).send("Account successfully registered!");
}

export async function signIn(req:Request, res:Response) {
  const { username, password } : 
  { username:string, password:string } = req.body;

  const token = await authServices.login({username, password});

  res.status(200).send(token);
}