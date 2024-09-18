  describe('Navigation', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('navigates to projects section', () => {
      cy.get('button').contains('span', /(Voir mes Projets|See Projects)/).click()
      cy.get('[class="project-card"]').should('be.visible')
    })

    it('navigates to contact section', () => {
      cy.get('button').contains('span', /(Me Contacter|Contact Me)/).click()
      cy.get('[class="modal__content"]').should('be.visible')
    })
  })
