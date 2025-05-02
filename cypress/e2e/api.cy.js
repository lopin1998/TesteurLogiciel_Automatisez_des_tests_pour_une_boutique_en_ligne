describe('API test', () => {
    it('API orders erreur no connect', () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/orders",
            failOnStatusCode: false,
        })
            .should((responce) => {
                expect(responce.status).to.eq(401)
            })
    });
    /* pas d'erreur afficher sur une erreur 401 donc aucune info client */
    it('API orders cart log', () => {
        cy.loginRequest()
            .then((resp) => {
                localStorage.setItem("JWT", resp.body.token)
                cy.request({
                    method: "GET",
                    url: "http://localhost:8081/orders",
                    failOnStatusCode: false,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("JWT")}`
                    }
                })
                    .should((responce) => {
                        expect(responce)
                    })
            })
    });
    /* appel avec une id produit specifique */
    it('API product spec with specific id', () => {
        cy.request({
            method: "GET",
            url: "http://localhost:8081/products/4"
        })
    });
    /* On ajoute des produit */
    it('API add product', () => {
        cy.loginRequest()
            .then((resp) => {
                localStorage.setItem("JWT", resp.body.token)
                cy.request({
                    method: "PUT",
                    url: "http://localhost:8081/orders/add",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        product: 4,
                        quantity: 4
                    })
                })
            })
    });
    it('Add comment', () => {
        cy.loginRequest()
            .then((resp) => {
                localStorage.setItem("JWT", resp.body.token)
                cy.request({
                    method: "POST",
                    url: "http://localhost:8081/reviews",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: "Super savon ! Je recommande",
                        comment: "<script>alert('xss')</script>",
                        rating: 5
                    })
                })
            })
    });
})