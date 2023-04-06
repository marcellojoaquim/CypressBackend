

export default class ValidaServerest {

    //Validações das ações que podemos realizar na API
    //Validar a busca por usuarios
    //Validar cadastro de novos usuários
    //Validar a realização de login

    static validaBuscaDeUsuarios(res) {
        expect(res).to.be.a('object')
        expect(res.body.quantidade).to.be.a('number')
        expect(res.body.quantidade).to.be.greaterThan(0)
    }

    static validaLoginComSucesso(res) {
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.haveOwnProperty('authorization')
    }

    
}