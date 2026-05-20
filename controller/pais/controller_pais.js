/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela validação, tratamento e manipular de dados para o CRUD de pais
 * Data:        20/05/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/ 

//import do arquivo de padronizacao de mensagens 
const config_message = require("../modulo/configMessages.js")

//fazer o o crud no banco de dados
const PaisDAO = require("../../model/DAO/pais/pais.js")



//Funão para inserir um novo pais
async function inserirNovoPais(pais,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
            let validar = await validarDados(pais)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os pais para o DAO
                let result = await PaisDAO.insertPais(pais)
                if (result) {

                    pais.id = result// coloca o id ao cargo apos ele ser inserido no banco 
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = pais
                        
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL//erro 500
                    
                }
                return message.DEFAULT_MESSAGE
            }
        }else{return message.ERROR_CONTENT_TYPE}//415
            
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500
    }
    
}


//FEITO
//funcao para atalizar pais
async function atualizarPais(pais, id, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
   

    try {
        //validacao pra aceitar apenas json
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            let restulBuscarId =await buscarPais(id)
            //
            if (restulBuscarId.status) {
                let validar = await validarDados(pais)
                if (!validar) {
                    
                    //adiciona o atributo id do filme no json para ser nviado no json
                    pais.id = id
                    //chama a funcao do dao pra atualizar filme de dentro do banco de dados
                    let result = await PaisDAO.updatePais(pais)


                    if (result) {
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPADATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPADATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPADATE_ITEM.message  
                        message.DEFAULT_MESSAGE.response    = pais
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






//funcao para retornar todos cargos
async function listarPais() {
    
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        let result = await PaisDAO.selectAllPais()

        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os filmes
                message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.pais    = result
                
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
//FEITO
//funcao pra buscar cargo pelo id
async function buscarPais(id) {
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
            let result = await PaisDAO.selectByIdPais(id)

            if (result) {
                if (result.length>0) {
                    message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.pais    = result
                    
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


//funcao pra apagar pais
async function apagarPais(id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let restulBuscarId =await buscarPais(id)
            //
        if (restulBuscarId.status) {
      
             //chama a funcao do dao pra deletar cargo de dentro do banco de dados
            let result = await PaisDAO.deletePais(id)


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

//funçao para validar todos dados do dados 
async function validarDados(pais) {
     //criando clone  do objeto json para manipular a estrutura local sem modificar o original
     let message = JSON.parse(JSON.stringify(config_message))


     //VALIDA pais
     if(pais.pais == undefined    || pais.pais == ""      || pais.pais == null     ||  pais.pais.length >  100){
        message.ERROR_BAD_REQUEST.field = "[pais] invalido"
        return message.ERROR_BAD_REQUEST
   
    }else{return false }
    
}

module.exports = {
    inserirNovoPais,
    listarPais,
    buscarPais,



    atualizarPais,


    apagarPais,
}
