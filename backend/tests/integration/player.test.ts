import app from "../../src/app";
import prisma from "../../src/databases/prisma";
import supertest from "supertest";
import __playerFactory from "../factories/playerFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE players RESTART IDENTITY CASCADE;`;
});

describe("POST /sign-up", () => {
    it("should successfully register an user with valid credentials", async () => {
        const player = await __playerFactory();

        const result = await supertest(app).post("/sign-up").send(player);

        expect(result.status).toBe(201);
        expect(result.text).toBe("Account successfully registered!");
    });
});

afterAll( async () => {
    prisma.$disconnect();
});
