describe('Integration test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/');
    });
    it('test conextion front', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
        cy.get('[data-cy="nav-link-cart"]').should('be.visible')
    });
    it('integrations panier', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
        cy.intercept("GET", "http://localhost:8081/products/random",{
            statusCode: 200,
        }).as('getCo')
        cy.wait('@getCo')
        cy.get('[data-cy="nav-link-products"]').click();
        cy.contains('Consulter').click();
        cy.get('p[data-cy="detail-product-stock"]').invoke('text').then((text) => {
            expect(parseInt(text)).to.be.greaterThan(0)
        })
    });
})