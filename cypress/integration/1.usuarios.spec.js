/// <reference types="Cypress" />

import Serverest from "../services/serverest.services"
import ValidaServerest from "../services/validaServerest.service"

describe('Casos de teste sobre a rota /usuarios da API Serverest resultados válidos', () => {

    it('Deve retonar os usuarios cadastrados', () => {
        Serverest.buscarUsuario().then(res => {
            ValidaServerest.validaBuscaDeUsuarios(res)
            cy.log(res)
        })
    })

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

    it('Deve criar um novo usuário com sucesso', () => {
        Serverest.cadastrarUsuarioComSucesso().then(res => {
            ValidaServerest.validaCadastroDeUsuarioComSucesso(res)
        })
    })

    it.only('Deve buscar usuário de um arquivo json', () =>{
        cy.fixture('usuario.json').then(json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then( res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
            
        })
    })

})

describe('Casos de teste sobre a rota /usuarios da API Serverest resultados inválidos', () =>{

    //it()

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then(res => {
            ValidaServerest.validaPostSemSucesso(res)
        })
    })
})