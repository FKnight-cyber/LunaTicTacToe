import { authData } from "../types/authTypes"
import authRepository from "../repositories/authRepository";
import { checkError } from "../middlewares/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function register(data:authData) {
  const checkUser = await authRepository.findUser(data.username);

  if(checkUser) throw checkError(409,"Username already registered!");

  data.password = encrypt(data.password);
  await authRepository.insert(data);
};

async function login(data:authData) {
  const checkUser = await authRepository.findUser(data.username);

  if(!checkUser) throw checkError(404,"Username not registered!");
  if(!decrypt(data.password, checkUser.password)) throw checkError(401,"Wrong password!");

  const token = generateUserToken(data);

  return token;
};

const authServices = {
  register,
  login
};

export default authServices;

function encrypt(password:string){
  return bcrypt.hashSync(password,10);
};

function decrypt(password:string, hashPassword:string){
  return bcrypt.compareSync(password, hashPassword);
};

function generateUserToken(data:authData){
  const secret:string = process.env.JWT_SECRET || "";
  return (
      jwt.sign({
          expiresIn: '24h',
          data
        }, secret)
  );
};