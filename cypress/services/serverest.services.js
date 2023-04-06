
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

    static cadastrarUsuario() {
        cy.request('POST', URL_USUARIOS).then(res => {
            cy.wrap({

            }).as('usuarioPost')
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
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: true,
            header: {
                aauthorization: Cypress.env('bearer')
            },
            body: {
                "nome": "Logitech MX Vertical",
                "preco": 470,
                "descricao": "Mouse",
                "quantidade": 381
            }
        })
    }
}