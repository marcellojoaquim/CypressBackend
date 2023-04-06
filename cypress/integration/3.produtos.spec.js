/// <reference types="Cypress" />

import Serverest from "../services/serverest.services"
import ValidaServerest from "../services/validaServerest.service"

describe('Casos de teste sobre a rota /produtos da API Serverest resultados válidos', () => {

    it('Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then((res) => {
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    it('Deve cadastrar um novo produto com sucesso', () => {
        //Login para salvar bearer
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then(usuario => {
            Serverest.logar(usuario).then(res => {
                ValidaServerest.validaLoginComSucesso(res)
                Serverest.salvarBearer(res)

                Serverest.cadastrarProdutoComSucesso().then(res => {
                    ValidaServerest.validarCadastroDeProdutoComSucesso(res)
                })
            })
        })
    })
})