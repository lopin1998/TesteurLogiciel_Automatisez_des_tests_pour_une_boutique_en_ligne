describe('template spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/');
    });
    it('check field and button of logIn', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
    })
    it('check button add to cart when log', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-add"]').click();
    });
    it('check stock field', () => {
        cy.get('[data-cy="nav-link-login"]').click();
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");
        cy.get('[data-cy="login-input-password"]').type("testtest");
        cy.get('[data-cy="login-submit"]').click();
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-stock"]');
    });
})