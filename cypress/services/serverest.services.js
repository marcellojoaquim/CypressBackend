import Factory from "../fixtures/factory"
const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'
const URL_PRODUTOS = '/produtos'
const URL_CARRINHOS = '/carrinhos'

export default class Serverest {
    //Ações que podemos realizar na API
    //Buscar usuarios
    //Cadastrar novos usuários
    //Ralizar login

    static buscarUsuario() {
        return cy.rest('GET', URL_USUARIOS)
    }

    static buscarUsuarioParaLogin() {
        cy.request(URL_USUARIOS).then(res => {
            cy.wrap({
                email: res.body.usuarios[0].email,
                password: res.body.usuarios[0].password
            }).as('usuarioLogin')
        })
    }

    static logar(usuario) {
        return cy.rest('POST', URL_LOGIN, usuario)
    }

    static cadastrarUsuarioComSucesso() {
        let usuario = Factory.criaNovoUsuarioAdmTrue();
       return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: usuario,
            failOnStatusCode: true,
        })
        
    }

    static salvarBearer(res) {
        Cypress.env('bearer', res.body.authorization.slice(7))
    }
    // Produtos

    static buscarProdutos() {
        return cy.rest('GET', URL_PRODUTOS)
    }

    static cadastrarProdutoComSucesso() {
        let produto = Factory.gerarProduto()
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('bearer')
            },
            body: produto
        })
        
    }

    
}