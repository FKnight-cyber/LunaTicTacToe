import { authData } from "../types/authTypes"
import authRepository from "../repositories/authRepository";
import { checkError } from "../middlewares/errorHandler";
import bcrypt from "bcrypt";

async function register(data:authData) {
  const checkUser = await authRepository.findUser(data.username);

  if(checkUser) throw checkError(409,"Username already registered!");

  data.password = encrypt(data.password);
  await authRepository.insert(data);
};

const authServices = {
  register
};

export default authServices;

function encrypt(password:string){
  return bcrypt.hashSync(password,10);
};

function decrypt(password:string, hashPassword:string){
  return bcrypt.compareSync(password, hashPassword);
};