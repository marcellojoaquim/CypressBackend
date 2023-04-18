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
        expect(res.status).to.eq(200)
        expect(res.body.message).to.be.a('string')
        expect(res.body).to.haveOwnProperty('authorization')
    }

    static validaPostSemSucesso(res) {
        expect(res).to.be.a('object')
        expect(res.status).to.eq(400)
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
    }

    //PRODUTOS

    static validarBuscaDeProdutos(res){
        expect(res).to.be.a('object')
        expect(res.body.quantidade).to.be.a('number')
        expect(res.body.quantidade).to.be.greaterThan(0)
        expect(res.body.produtos[0]).to.be.haveOwnProperty('nome')
        expect(res.body.produtos[0]).to.be.haveOwnProperty('preco')
        expect(res.body.produtos[0]).to.be.haveOwnProperty('descricao')
    }

    static validarCadastroDeProdutoComSucesso(res){
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.a('string')
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(res.body).to.haveOwnProperty('_id')

    }

    static validaCadastroDeUsuarioComSucesso(res){
        expect(res).to.be.a('object')
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
        expect(res.body).to.haveOwnProperty('_id')
        expect(res.status).to.eq(201)
    }
}