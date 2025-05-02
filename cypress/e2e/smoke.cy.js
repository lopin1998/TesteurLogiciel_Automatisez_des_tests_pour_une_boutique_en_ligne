describe('Smoke test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/');
    });
    it('check field and button of logIn', () => {
        cy.login()
    })
    /* ok */
    it('check button add to cart when log', () => {
        cy.login()
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-add"]').click();
    });
    /* ok */
    it('check stock field', () => {
        cy.login()
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-stock"]');
    });
    /* produit mêmes avec un stock de 0 et descent en negatif */
})