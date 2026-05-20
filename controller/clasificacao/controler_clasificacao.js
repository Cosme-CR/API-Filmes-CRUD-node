/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela validação, tratamento e manipular de dados para o CRUD de filmes
 * Data:        17/04/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/ 

//import do arquivo de padronizacao de mensagens 
const config_message = require("../modulo/configMessages.js")
const classificacaoDAO = require("../../model/DAO/clasificacao/clasificacao.js")


//Funão para inserir um nova clasificacao
async function inserirNovoClasificacao(clasificacao,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
            let validar = await validarDados(clasificacao)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda a clasificacao para o DAO
                let result = await classificacaoDAO.insertClasificacao(clasificacao)
                if (result) {

                    clasificacao.id = result// coloca o id ao filme apos ele ser inserido no banco 
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = clasificacao
                        
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



//funcao para atalizar clasificacao
async function atualizarClasificacao(clasificacao, id, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //validacao pra aceitar apenas json
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            let restulBuscarId =await buscarClasificacao(id)
            //
            if (restulBuscarId.status) {
                let validar = await validarDados(clasificacao)
                if (!validar) {
                    
                    //adiciona o atributo id do filme no json para ser nviado no json
                    clasificacao.id = id
                    //chama a funcao do dao pra atualizar clasificacao de dentro do banco de dados
                    let result = await classificacaoDAO.updateClasificacao(clasificacao)

                    if (result) {
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPADATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPADATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPADATE_ITEM.message  
                        message.DEFAULT_MESSAGE.response    = clasificacao
                        return message.DEFAULT_MESSAGE//200  
 
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL//500
                    }
                }else{
                    return validar
                }
            }else{
                return restulBuscarId//400 ou 404 ou 500
            }
        }else{
            return message.ERROR_CONTENT_TYPE//415 tipo errado
        }

    } catch (error) {
       // console.log(erro)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}

//funcao para retornar todos clasificacao
async function listarClasificacao() {
    
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        
        let result = await classificacaoDAO.selectAllClasificacao()
        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os filmes
                message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.classificacao    = result
                
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

//funcao pra buscar classificacao pelo id
async function buscarClasificacao(id) {
    // 200 achou
    // 404 nao achou
    // 500 erro na model
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //validacao pra garntir que o id seja valido
        if (id == undefined || id == "" || id == null ||  isNaN(id) ) {
            message.ERROR_BAD_REQUEST.field = "[ID] invalido"
            return message.ERROR_BAD_REQUEST // 400
        }else{
            let result = await classificacaoDAO.selectByIdClasificacao(id)

            if (result) {
                if (result.length>0) {
                    message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.classificacao    = result
                    
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


//funcao pra apagar classificacao
async function apagarClasificacao(id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let restulBuscarId =await buscarClasificacao(id)
            //
        if (restulBuscarId.status) {
      
             //chama a funcao do dao pra deletar filme de dentro do banco de dados
            let result = await classificacaoDAO.deleteClasificacao(id)


            if (result) {
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_DELETE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_DELETE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_DELETE_ITEM.message  
                        return message.DEFAULT_MESSAGE//200  
 
                } else {
                     return message.ERROR_INTERNAL_SERVER_MODEL//500
                }
        }else{
            return restulBuscarId// retorna que nao encontrou nda
        }
    
    } catch (error) {
       //console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }

    
}

//funçao para validar todos dados da classificacao 
async function validarDados(clasificacao) {
     //criando clone  do objeto json para manipular a estrutura local sem modificar o original
     let message = JSON.parse(JSON.stringify(config_message))


     if(clasificacao.sigla == undefined || clasificacao.sigla == ""|| clasificacao.sigla == null            ||  clasificacao.sigla.length >  10){
        message.ERROR_BAD_REQUEST.field = "[sigla] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA classificacao   
    }else if(clasificacao.clasificacao == undefined || clasificacao.clasificacao == ""|| clasificacao.clasificacao == null            ||  clasificacao.clasificacao.length >  80){
        message.ERROR_BAD_REQUEST.field = "[classificacao] invalido"
        return message.ERROR_BAD_REQUEST
    //VALIDA caracteristica   
    }else if( clasificacao.caracteristica == undefined || clasificacao.caracteristica == ""|| clasificacao.caracteristica == null || clasificacao.caracteristica.length >80 ){
        message.ERROR_BAD_REQUEST.field = "[caracteristica] invalido"
        return message.ERROR_BAD_REQUEST 
    }else{return false }
    
}

module.exports = {
    inserirNovoClasificacao,
    listarClasificacao,
    buscarClasificacao,
    atualizarClasificacao,
    apagarClasificacao,
}

