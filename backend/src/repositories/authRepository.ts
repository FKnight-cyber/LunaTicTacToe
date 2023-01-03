import prisma from "../databases/prisma";
import { authData } from "../types/authTypes";

async function insert(data:authData) {
  await prisma.player.create({data})
};

async function findUser(username:string) {
  return await prisma.player.findFirst({where:{username}});
}

const authRepository = {
  insert,
  findUser
};

export default authRepository;