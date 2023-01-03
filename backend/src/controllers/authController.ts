import { Request, Response } from "express";
import authServices from "../services/authService";

export async function signUp(req:Request, res:Response) {
  const { username, password } : 
  { username:string, password:string } = req.body;

  console.log(username)
  console.log(password)

  await authServices.register({username, password});

  res.status(201).send("Account successfully registered!");
}