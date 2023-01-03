import { authData } from "../types/authTypes"
import authRepository from "../repositories/authRepository";
import { checkError } from "../middlewares/errorHandler";
import utils from "../utils/authUtils";

async function register(data:authData) {
  const checkUser = await authRepository.findUser(data.username);

  if(checkUser) throw checkError(409,"Username already registered!");

  data.password = utils.encrypt(data.password);
  await authRepository.insert(data);
};

async function login(data:authData) {
  const checkUser = await authRepository.findUser(data.username);

  if(!checkUser) throw checkError(404,"Username not registered!");
  if(!utils.decrypt(data.password, checkUser.password)) throw checkError(401,"Wrong password!");

  const token = utils.generateUserToken(data);

  return token;
};

const authServices = {
  register,
  login
};

export default authServices;