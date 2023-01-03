import { jest } from "@jest/globals";
import authRepository from "../../src/repositories/authRepository";
import authServices from "../../src/services/authService";
import { Player } from "@prisma/client";
import __playerFactory from "../factories/playerFactory";

jest.mock("../../src/repositories/authRepository.ts");

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe("Authentication service suit tests", () => {
  it("should successfully register a new player", async () => {
    const player = await __playerFactory();

    jest.spyOn(authRepository, "findUser").mockImplementationOnce(():any => {
      return false;
    });

    await authServices.register(player);

    expect(authRepository.insert).toBeCalled();
  });

  it("should fail to register an already registered username", async () => {
    const player = await __playerFactory();

    jest.spyOn(authRepository, "findUser").mockImplementationOnce(async ():Promise<Player> => {
      return {
        id:111,
        username: player.username,
        password: player.password
      };
    });

    const result = authServices.register(player);

    expect(result).rejects.toEqual({
      status:409,
      message: "Username already registered!"
    });
  });
});

afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});