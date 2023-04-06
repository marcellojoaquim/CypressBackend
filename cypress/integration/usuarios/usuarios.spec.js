/// <reference types="Cypress" />

import Serverest from "../../services/serverest.services"
import ValidaServerest from "../../services/validaServerest.service"

describe('Casos de teste sobre a rota /usuarios da API Serverest', () => {

    it('Deve retonar os usuarios cadastrados', () => {
        Serverest.buscarUsuario().then(res => {
            ValidaServerest.validaBuscaDeUsuarios(res)
        })
    })

    it('Não deve postar um novo usuário administrador existente', () => {
        cy.postarUsuarioSemSucesso().then(res => {
            expect(res).to.be.a('object')
            expect(res.body.message).to.be.a('string')
            expect(res.body.message).to.be.eq('Este email já está sendo usado')
        })
    })

    

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validaLoginComSucesso(res)
            })
        })
    })
})