import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authData } from "../types/authTypes"
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

const utils = {
  encrypt,
  decrypt,
  generateUserToken
};

export default utils;