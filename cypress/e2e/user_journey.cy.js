describe('User Journey', () => {
    it('completes a full user journey', () => {
      cy.visit('/')
      cy.contains('h1', /(Solutions full stack adaptées à vos besoins métiers|Full Stack solutions tailored to your business needs)/).should('be.visible')
  
      cy.get('button').contains('span', /(Voir mes Projets|See Projects)/).click()
      cy.get('[class="project-card"]').should('be.visible')


      cy.get('.project-card__title').should('be.visible')
      cy.get('.project-card__description').should('be.visible')
      cy.get('.project-card__tags').scrollIntoView().should('be.visible')
    
      cy.get('.project-card__close-button').click()
      cy.get('.carousel-modal__overlay').should('not.exist')
  
      cy.get('button').contains('span', /(Me Contacter|Contact Me)/).click()
      cy.get('[class="modal__content"]').should('be.visible')

      cy.get('input[id=name]').type('Ilyas Rima')
      cy.get('input[id=email]').type('ilyas@example.com')
      cy.get('textarea[id=message]').type('Hello')
      cy.get('.modal__submit-button').click()
      cy.get('.toast').should('be.visible')
    })
  })
  