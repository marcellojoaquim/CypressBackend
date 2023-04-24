/// <reference types="Cypress" />

import Serverest from "../services/serverest.services"
import ValidaServerest from "../services/validaServerest.service"
import Factory from "../fixtures/factory"

describe('Casos de teste sobre a rota /usuarios da API Serverest resultados válidos', () => {

    it('Deve retonar os usuarios cadastrados', () => {
        Serverest.buscarUsuario().then(res => {
            cy.validacaoDeContrato(res, 'get-usuarios', 200)
            ValidaServerest.validaBuscaDeUsuarios(res)
    
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

    it('Deve buscar usuário de um arquivo json', () =>{
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

    it.only('Deve buscar e salvar um usuário num arq json', ()=>{
        let inteiro = Factory.gerarInteiroAleatorio()
        Serverest.buscarUsuario().then(res => {
            cy.log(JSON.stringify(res.body.usuarios[inteiro]))
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[inteiro])
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