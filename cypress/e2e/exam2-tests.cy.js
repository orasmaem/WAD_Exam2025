/// <reference types = "cypress"/>  


it('Instructor Page Test', () => {
   
    cy.visit('http://localhost:8080/Instructor');
  
    cy.get('h1').should('contain', 'Instructor Management Pannel');
  });


