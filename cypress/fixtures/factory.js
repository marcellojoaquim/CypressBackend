const faker = require('faker');


export default class Factory {

    static gerarProduto() {
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.datatype.number(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static criaNovoUsuarioAdmTrue() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": "teste",
            "administrador": "true"
        }
    }

    static criaNovoUsuarioAdmFalse() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": "teste",
            "administrador": "false"
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(10);
    }
}


