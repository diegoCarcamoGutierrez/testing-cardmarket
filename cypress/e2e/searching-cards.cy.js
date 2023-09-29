describe('home page', () => {

  beforeEach(()=>{
    cy.visit("https://www.cardmarket.com/es/YuGiOh")
  })
  

  it('Search a valid product',()=>{
    cy.get("#ProductSearchInput").type("Fenrir")
    cy.get("#search-btn").click()
    cy.get('.my-3').should("exist")
    cy.get(".table-striped").should("exist")
  })

  it('Search an invalid product',()=>{
    cy.get("#ProductSearchInput").type("(")
    cy.get("#search-btn").click()
    cy.get(".noResults").should("exist").contains("No hay resultados para su consulta")
  })

  it('Search with empty search bar',()=>{
    cy.get("#search-btn").click()
    cy.get(".table-striped").should("exist")
    cy.get('#sortBy').select("popularity_desc").contains("Más popular")
  })

  it("Search by relevant criteria",()=>{
    cy.get("#search-btn").click()
    cy.get("#sortBy").select(3)
    cy.get('.filter-form > .btn-primary').click()
    cy.get(".table-striped").should("exist")
  })

  it("Pagination",()=>{
    cy.get("#ProductSearchInput").type("Magician")
    cy.get("#search-btn").click()
    cy.get('.col-12 > .d-flex > .ms-3').click()
    cy.get(".table-striped").should("exist")
  })

})