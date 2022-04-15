const { idleTimeoutMillis } = require("pg/lib/defaults")

describe("test skatepark", () => {
    it("test login", () => {
        cy.visit("http://localhost:5000/login");
        cy.get("input[name='email']").type("pedro@email.com");
        cy.get("input[name='password']").type("123");
        cy.get("button").click();
    })
})