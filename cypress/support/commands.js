// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import Ajv from 'ajv'
import addFormats  from 'ajv/dist/types'

const ajv = new Ajv({ allErrors: true, verbose: true, strict: false })
//addFormats(ajv)
Cypress.Commands.add('validacaoDeContrato', (res, schema, status) => {
    
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validador = ajv.compile(schema)
        const valido = validador(res.body)
        console.log(validador)

        if (!valido) {
            var errors = '';
            for (let each in validador.errors) {
                let err = validador.errors[each];
                errors += `\n${err.instancePath} ${err.message}, but receive ${typeof err.data}`;
            }
            throw new Error('Erros encontrados na validação de contrato: ' + errors)
        }
        return 'Contrato válido'
    })
})


Cypress.Commands.add('postarUsuarioSemSucesso', () => {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        failOnStatusCode: false,
        body: {
            "nome": "Fulano da Silva",
            "email": "fulano@qa.com",
            "password": "teste",
            "administrador": "true"
        }
    })
})

Cypress.Commands.add('rest', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
})

Cypress.Commands.add('logar', (email, senha) => {
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode: false,
        body: {
            'email': email,
            'password': senha
        }
    })
})

Cypress.Commands.add('buscarUsuarioParaLogin', () => {
    cy.rest('GET', '/usuarios').then(res => {
        expect(res.body).to.haveOwnProperty('usuarios')
        return {
            email: res.body.usuarios[0].email,
            senha: res.body.usuarios[0].password
        }
    })
})