import __playerFactory from "../../factories/playerFactory";

const URL = "http://localhost:3000";
const server = "http://localhost:5000";

//before run cypress tests, make sure to run backend utilizing .env.test
beforeEach(() => {
    cy.resetDatabase();
})

describe("Authentication", () => {
    it("should successfully register an player and than sign-in", async () => {
        const player = await __playerFactory();

        cy.visit(`${URL}/`);

        cy.get('[data-cy="cy-register"]').click();

        cy.url().should('eq', `${URL}/sign-up`);

        cy.get('[data-cy="cy-username"]').type(player.username);
        cy.get('[data-cy="cy-password"]').type(player.password);

        cy.intercept("POST", `${server}/sign-up`).as("sign-up");

        cy.get('[data-cy="cy-submit-register"]').click();

        cy.wait("@sign-up").then((interception) => {
            expect(interception.response.statusCode).eq(201);

            cy.url().should('eq', `${URL}/`);

            cy.get('[data-cy="login-username"]').type(player.username);
            cy.get('[data-cy="login-pass"]').type(player.password);

            cy.intercept("POST", `${server}/sign-in`).as("sign-in");

            cy.get('[data-cy="submit-login"]').click();

            cy.wait("@sign-in").then(interception => {
                expect(interception.response.statusCode).eq(200);
                expect(typeof(interception.response.body)).to.eq('string');
                cy.url().should('eq', `${URL}/initialpage`);
            });
        });
    });

    it("should fail to register duplicated username", async () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false
        });

        const player = await __playerFactory();

        cy.visit(`${URL}/`);

        cy.get('[data-cy="cy-register"]').click();

        cy.url().should('eq', `${URL}/sign-up`);

        cy.get('[data-cy="cy-username"]').type(player.username);
        cy.get('[data-cy="cy-password"]').type(player.password);
        cy.get('[data-cy="cy-submit-register"]').click();

        cy.get('[data-cy="cy-register"]').click();

        cy.get('[data-cy="cy-username"]').type(player.username);
        cy.get('[data-cy="cy-password"]').type(player.password);

        cy.intercept("POST", `${server}/sign-up`).as("sign-up");

        cy.get('[data-cy="cy-submit-register"]').click();

        cy.wait("@sign-up").then((interception) => {
            expect(interception.response.statusCode).eq(409);
        });
    });
});