describe('Smoke test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/');
    });
    /* Test login */
    it('check field and button of logIn', () => {
        cy.login()
    })
    /* Verifier apret connexion de l'existance du button cunsulter */
    it('check button add to cart when log', () => {
        cy.login()
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-add"]').click();
    });
    /* Vérifier la quantiter de stock disponible */
    it('check stock field', () => {
        cy.login()
        cy.contains('Consulter').click();
        cy.get('[data-cy="detail-product-stock"]');
    });
    /* produit mêmes avec un stock de 0 et descent en negatif */
})