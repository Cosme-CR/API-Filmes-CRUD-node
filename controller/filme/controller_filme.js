/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela validação, tratamento e manipular de dados para o CRUD de filmes
 * Data:        17/04/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/ 

//import do arquivo de padronizacao de mensagens 
const config_message = require("..modulo/config_message.js")



//Funão para inserir um novo filme
async function inserirNovoFilme(filme) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    //fazer o o crud no banco de dados
    const filmeDAO = require("../../model/DAO/filme/filme.js")

    //VALIDA NOME
    if(filme.nome == ""                 || filme.nome == null            || filme.nome == undefined            || filme.nome.length >  80){
        message.ERROR_BAD_REQUEST.field = "[nome] invalido"
    //VALIDA DATA    
    }else if(filme.data_lancamento == ""|| filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10 ){
        message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMEMTO] invalido"
    //VALIDA DURACAO
    }else if (filme.deuracao == ""      || filme.deuracao == null        || filme.deuracao == undefined        || filme.deuracao.length  < 5  ){
        message.ERROR_BAD_REQUEST.field = "[DURACAO] invalido"
    //VALIDA SINOPSE
    }else if (filme.sinopse == ""       || filme.sinopse == null         || filme.sinopse == undefined ){
        message.ERROR_BAD_REQUEST.field = "[SINOPSE] invalido"
    //VALIDA AVALIACAO
    }else if(isNaN(filme.avaliacao)     || filme.avaliacao.length > 3 ){
        message.ERROR_BAD_REQUEST.field = "[AVALIACAO] invalido"
    //VALIDA VALOR
    }else if (filme.valor == ""         || filme.valor == null          || filme.valor == undefined            || filme.valor.length > 5 || isNaN( filme.valor) ){
        message.ERROR_BAD_REQUEST.field = "[VALOR] invalido"
    //VALIDA CAPA
    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = "VALOR invalido"
    }else{
        let result = await filmeDAO.insertFilme(filme)
        if (result) {
            message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
            message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
            message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message    
        }else{
            message.DEFAULT_MESSAGE.status      = message.ERROR_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code = message.ERROR_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message     = message.ERROR_BAD_REQUEST.message
            message.DEFAULT_MESSAGE.field     = message.ERROR_BAD_REQUEST.field
            
        }
        return message.DEFAULT_MESSAGE
    }
    
}



//funcao para atalizar filme
async function atualizarFilme(params) {
    
}

//funcao para retornar todos filmes
async function listarFilmes(params) {
    
}

//funcao pra buscar filmes pelo id
async function buscarFilme(params) {
    
}



module.exports{
    inserirNovoFilme,
}
//