/// <reference types="Cypress" />

import Serverest from "../../services/serverest.services"
import ValidaServerest from "../../services/validaServerest.service"

describe('Casos de teste sobre a rota /produtos da API Serverest resultados válidos', () => {

    it.only('Deve buscar todos os produtos cadastrados', ()=>{
        Serverest.buscarProdutos().then(() =>{
            ValidaServerest.validarBUscaDeProdutos(res)
        })
    })

    is('Deve cadastrar um novo produto com sucesso', ()=>{
        Serverest.cadastrarProdutoComSucesso().then(res => {
            ValidaServerest.validarCadastroDeProdutoComSucesso(res)
        })
    })
})