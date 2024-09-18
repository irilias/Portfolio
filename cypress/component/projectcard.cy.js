import ProjectCard from '../../src/components/ProjectCard.vue'

describe('ProjectCard Component', () => {
  it('renders project details correctly', () => {
      const project = {
        title: 'Test Project',
        description: 'Project description',
        image: '/test-image-1024w.webp 1024w',
        tags: ['Vue', 'Cypress'],
        status: 'active'
      }

      cy.mount(ProjectCard, { props: { project } })

      cy.get('.project-card__title').should('have.text', 'Test Project')
      cy.get('.project-card__description').should('have.text', 'Project description')
      cy.get('.project-card__image').should('have.attr', 'src', '/test-image-1024w.webp')
      cy.get('.project-card__tag').should('have.length', 2)
    })

    it('displays demo and repository buttons for active projects', () => {
      const project = {
        status: 'active',
        liveDemo: 'https://demo.com',
        repository: 'https://github.com/repo',
        image: '/test-image-1024w.webp 1024w',
        title: 'Test Project' 
      }

      cy.mount(ProjectCard, { props: { project } })
      cy.contains('span', 'Demo').should('be.visible')
      cy.contains('span', 'Repository').should('be.visible')
    })

    it('displays status message for confidential projects', () => {
      const project = {
        status: 'confidential',
        liveDemo: 'https://demo.com',
        repository: 'https://github.com/repo',
        image: '/test-image-1024w.webp 1024w',
        title: 'Test Project' 
      }

      cy.mount(ProjectCard, { props: { project } })
      cy.get('.project-card__status-message').should('be.visible')
      cy.get('.project-card__status-icon').should('have.attr', 'alt', 'confidential')
    })

  })
