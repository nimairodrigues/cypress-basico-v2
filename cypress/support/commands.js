Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('input[id=firstName]').type('One')
    cy.get('input[id=lastName]').type('Two')
    cy.get('input[id=email]').type('onetwo@numbers.com')
    cy.get('textarea[name=open-text-area]').type('Quero um bolo de carne')

    cy.contains('button', 'Enviar').click()
})