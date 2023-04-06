/// <reference types="Cypress" />

import Serverest from "../services/serverest.services"
import ValidaServerest from "../services/validaServerest.service"

describe('Casos de teste sobre a rota /login da API Serverest resultados válidos', () => {

    it('Deve realizar login com sucesso', () => {
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

})