/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela validação, tratamento e manipular de dados para o CRUD de filmes
 * Data:        17/04/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/ 

//import do arquivo de padronizacao de mensagens 
const config_message = require("../modulo/configMessages.js")



//Funão para inserir um novo filme
async function inserirNovoFilme(filme,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    //fazer o o crud no banco de dados
    const filmeDAO = require("../../model/DAO/filme/filme.js")

    try {


        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
        

            let validar = await validarDados(filme)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os filmes para o DAO
                let result = await filmeDAO.insertFilme(filme)
                if (result) {
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message    
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//erro 500
                    
                }
                return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}



//funcao para atalizar filme
async function atualizarFilme(params) {
    
}

//funcao para retornar todos filmes
async function listarFilmes(params) {
    
    let message = JSON.parse(JSON.stringify(config_message))
    const filmeDAO = require("../../model/DAO/filme/filme.js")
    
    try {
        let result = await filmeDAO.selectAllFilme()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os filmes
                message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.filme    = result
                
                // retorna tudo
                return message.DEFAULT_MESSAGE // 200 dados do filme
            }else{
                return message.ERROR_NOT_FOUND//404
            }
            
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL// 500 model
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//erro 500 controller
    }
    
}

//funcao pra buscar filmes pelo id
async function buscarFilme(id) {
    // 200 achou
    // 404 nao achou
    // 500 erro na model
    let message = JSON.parse(JSON.stringify(config_message))
    const filmeDAO = require("../../model/DAO/filme/filme.js")

    try {
        //validacao pra garntir que o id seja valido
        if (id == "" || id == null || id == undefined || isNaN(id) ) {
            message.ERROR_BAD_REQUEST.field = "[ID] invalido"
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await filmeDAO.selectByIdFilme(id)

            if (result) {
                if (result.length>0) {
                    message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme    = result
                    
                    return message.DEFAULT_MESSAGE               //200 sucesso
                }else{
                    return message.ERROR_NOT_FOUND              //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL      //erro 500 model
            }
        }


        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//funçao para validar todos dados do filme 
async function validarDados(filme) {
     //criando clone  do objeto json para manipular a estrutura local sem modificar o original
     let message = JSON.parse(JSON.stringify(config_message))


     //VALIDA NOME
     if(filme.nome == ""                 || filme.nome == null            || filme.nome == undefined            || filme.nome.length >  80){
        message.ERROR_BAD_REQUEST.field = "[nome] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA DATA    
    }else if(filme.data_lancamento == ""|| filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10 ){
        message.ERROR_BAD_REQUEST.field = "[DATA_LANCAMEMTO] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA DURACAO
    }else if (filme.duracao == ""      || filme.duracao == null        || filme.duracao == undefined        || filme.duracao.length  < 5  ){
        message.ERROR_BAD_REQUEST.field = "[DURACAO] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA SINOPSE
    }else if (filme.sinopse == ""       || filme.sinopse == null         || filme.sinopse == undefined ){
        message.ERROR_BAD_REQUEST.field = "[SINOPSE] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA AVALIACAO
    }else if(isNaN(filme.avaliacao)     || filme.avaliacao.length > 3 ){
        message.ERROR_BAD_REQUEST.field = "[AVALIACAO] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA VALOR
    }else if (filme.valor == ""         || filme.valor == null          || filme.valor == undefined            || filme.valor.split('.')[0].length > 3 || isNaN( filme.valor) ){
        message.ERROR_BAD_REQUEST.field = "[VALOR] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA CAPA
    }else if(filme.capa.length > 255){
        message.ERROR_BAD_REQUEST.field = "VALOR invalido"
        return message.ERROR_BAD_REQUEST
    }else{return false }
    
}

module.exports = {
    inserirNovoFilme,
    listarFilmes,
    buscarFilme,
    atualizarFilme,
}
//