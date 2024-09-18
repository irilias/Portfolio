import { mount } from 'cypress/vue'
import i18n from '../../src/i18n';


Cypress.Commands.add('mount', (component, options = {}) => {
  options.global = options.global || {}
  options.global.plugins = options.global.plugins || []
  options.global.plugins.push(i18n)

  return mount(component, options)
})
