/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT - select', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('', function() {
        
    })
})

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id=firstName]').type('One').should('have.value', 'One')
        cy.get('input[id=lastName]').type('Two').should('have.value', 'Two')
        cy.get('input[id=email]').type('onetwo@numbers.com').should('have.value', 'onetwo@numbers.com')
        cy.get('textarea[name=open-text-area]').type('Quero um bolo de carne').should('have.value', 'Quero um bolo de carne')
        cy.contains('button', 'Enviar').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Tentando colocar um valor grande na área de texto', function() {
        const longText = 'Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, Quero assistir Naruto, '

        cy.get('textarea[name=open-text-area]').type(longText, {delay: 0})
    })

    it('validando a mensagem de erro ao enviar email com formatação inválida', function() {
        cy.get('input[id=firstName]').type('One').should('have.value', 'One')
        cy.get('input[id=lastName]').type('Two').should('have.value', 'Two')
        cy.get('input[id=email]').type('onetwonumbers.com').should('have.value', 'onetwonumbers.com')
        cy.get('textarea[name=open-text-area]').type('Quero um bolo de carne').should('have.value', 'Quero um bolo de carne')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('Validando o campo de telefone quando digitar valor não-numérico', function() {    
        cy.get('input[id=phone]')
            .type('teste')
            .should('have.text', '')
    })

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('input[id=firstName]').type('One').should('have.value', 'One')
        cy.get('input[id=lastName]').type('Two').should('have.value', 'Two')
        cy.get('input[id=email]').type('onetwo@numbers.com').should('have.value', 'onetwo@numbers.com')
        cy.get('input[id=phone-checkbox]').check()
        cy.get('textarea[name=open-text-area]').type('Quero um bolo de carne').should('have.value', 'Quero um bolo de carne')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('input[id=firstName]').type('One').should('have.value', 'One').clear().should('have.value', '')
        cy.get('input[id=lastName]').type('Two').should('have.value', 'Two').clear().should('have.value', '')
        cy.get('input[id=email]').type('onetwo@numbers.com').should('have.value', 'onetwo@numbers.com').clear().should('have.value', '')
        cy.get('input[id=phone]').type('123456789').should('have.value', '123456789').clear().should('have.value', '')
        cy.get('textarea[name=open-text-area]').type('Quero um bolo de carne').should('have.value', 'Quero um bolo de carne').clear().should('have.value', '')
        
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })
  })
  
  describe('Central de Atendimento ao Cliente TAT - select', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('select[id=product]').select('YouTube').should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('select[id=product').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('select[id=product]').select(1).should('have.value', 'blog')
    })
})

describe('Central de Atendimento ao Cliente TAT - radio', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('marca o tipo de atendimento "Feedback"', function() {
//        cy.get('input[type=radio]').check('feedback').should('be.checked')
        cy.get('input[type=radio][value=feedback]').check().should('be.checked')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type=radio]').should('have.length', 3).each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
})

describe('Central de Atendimento ao Cliente TAT - checkbox', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type=checkbox]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })
})