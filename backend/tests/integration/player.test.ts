import app from "../../src/app";
import prisma from "../../src/databases/prisma";
import supertest from "supertest";
import __playerFactory from "../factories/playerFactory";
import authRepository from "../../src/repositories/authRepository";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE players RESTART IDENTITY CASCADE;`;
});

describe("POST /sign-up", () => {
    it("should successfully register an user with valid credentials", async () => {
        const player = await __playerFactory();

        const result = await supertest(app).post("/sign-up").send(player);

        expect(result.status).toBe(201);
        expect(result.text).toBe("Account successfully registered!");

        const checkPlayer = await authRepository.findUser(player.username);

        expect(checkPlayer.username).toEqual(player.username);
        expect(checkPlayer.password).not.toEqual(player.password);
    });

    it("should fail to register an already registered username", async () => {
        const player = await __playerFactory();

        await supertest(app).post("/sign-up").send(player);

        const result = await supertest(app).post("/sign-up").send(player);

        expect(result.status).toBe(409);
        expect(result.text).toBe("Username already registered!");
    });

    it("should successfully login a registered user", async () => {
        const player = await __playerFactory();

        await supertest(app).post("/sign-up").send(player);

        const result = await supertest(app).post("/sign-in").send(player);

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });

    it("should fail to login a unregistered user", async () => {
        const player = await __playerFactory();

        const result = await supertest(app).post("/sign-in").send(player);

        expect(result.status).toBe(404);
        expect(result.text).toBe("Username not registered!");
    });

    it("should fail to login an user with wrong password", async () => {
        const player = await __playerFactory();

        await supertest(app).post("/sign-up").send(player);

        const result = await supertest(app).post("/sign-in").send({
            username: player.username,
            password: "wrongpassword"
        });

        expect(result.status).toBe(401);
        expect(result.text).toBe("Wrong password!");
    });
});

afterAll( async () => {
    prisma.$disconnect();
});
