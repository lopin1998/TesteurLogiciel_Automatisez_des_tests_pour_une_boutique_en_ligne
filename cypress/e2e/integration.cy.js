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

        cy.intercept("GET", "http://localhost:8081/products/random", {
            statusCode: 200,
        }).as('getCo')


        cy.get('[data-cy="nav-link-login"]').click();

        cy.get('[data-cy="login-input-username"]').type("test2@test.fr");

        cy.get('[data-cy="login-input-password"]').type("testtest");

        cy.get('[data-cy="login-submit"]').click();

        cy.wait('@getCo')

        cy.get('[data-cy="nav-link-products"]').click();

        cy.intercept("GET", "**/products/4", {
            statusCode: 200,
        }).as('getProduct')

        cy.get('[ng-reflect-router-link="/products,4"]').click();

        /* cy.wait('@getProduct').then((interception) => { 
            expect(interception.response.statusCode).to.eq(200) */
            cy.request({
                method: "GET",
                url: "http://localhost:8081/products/4"
            }).then((resp) => {
                cy.get('[class="stock"]').invoke('text').then((text) => {
                    /* console.log(text.replace(' en stock', 'marcel')) */
                    expect(parseInt(text.replace(' en stock', `${resp.body.availableStock}`))).to.be.greaterThan(0);
                    cy.get('[data-cy="detail-product-add"]').click();
                })
            })
            
        /* }) */

        /* cy.wait('@getProduct').then(() => {
            cy.get('p[data-cy="detail-product-stock"]').invoke('text').then((text) => {
                console.log(text)
                console.log(text.replace(' en stock', 'marcel'))
                expect(parseInt(text.replace(' en stock', 'marcel'))).to.be.greaterThan(0)
                cy.get('[data-cy="detail-product-add"]').click();
            })
        }) */
    });
})