

describe('home page', () => {

  beforeEach(()=>{
    cy.visit("https://www.cardmarket.com/es/YuGiOh")
    cy.getAllCookies()
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

  it("Most expensive and Description screenshot",()=>{
    cy.get("#ProductSearchInput").type("Fenrir")
    cy.get("#search-btn").click()
    cy.get('#sortBy').select("Más caras primero")
    cy.get('.filter-form > .btn-primary').click()
    cy.get('.table-body').children(".row.no-gutters").siblings().first().children(".col").children(".row.no-gutters")
    .children().siblings().first().children().children().siblings().first().click()
    cy.screenshot()
  })

  it("Most expensive and Description screenshot v2",()=>{
    cy.get("#ProductSearchInput").type("Fenrir")
    cy.get("#search-btn").click()
    cy.get('#sortBy').select("Más caras primero")
    cy.get('.filter-form > .btn-primary').click()
    cy.get('.table-body').children(".row.no-gutters").eq(0).children().eq(3).children().children().children().children().eq(0)
    .click()
    cy.screenshot()
  })

  it("Fith element from the fith page",()=>{
    cy.get("#ProductSearchInput").type("Magician")
    cy.get("#search-btn").click()
    cy.get('.col-12 > .d-flex').then(count=>{
      for (let index=0; index<4; index ++){
        cy.get('.col-12 > .d-flex').children().eq(2).click()
      }
    })
    cy.get('.table-body').children(".row.no-gutters").eq(4).children().eq(3).children().children().children().children().eq(0)
    .click()
    
  })

  it("Grid View fith page",()=>{
    cy.get("#ProductSearchInput").type("Magician")
    cy.get("#search-btn").click()
    cy.get('.col-12 > .d-flex').then(count=>{
      for (let index=0; index<4; index ++){
        cy.get('.col-12 > .d-flex').children().eq(2).click()
      }
    })
    cy.get('.my-3').children().last().click()
  })

  it.only("Cheap Playmats",()=>{
    cy.get("#ProductSearchInput").type("Magician")
    cy.get("#search-btn").click()
    cy.get('.filter-form > :nth-child(1)').children().eq(1).select("Tapetes")
    cy.get('.filter-form > .btn-primary').click()
    cy.get('.my-3').children().last().click()
  })

})