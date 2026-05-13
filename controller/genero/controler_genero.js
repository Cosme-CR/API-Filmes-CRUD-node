/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela validação, tratamento e manipular de dados para o CRUD de genero
 * Data:        13/05/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/ 

//import do arquivo de padronizacao de mensagens 
const config_message = require("../modulo/configMessages.js")

//fazer o o crud no banco de dados
const GeneroDAO = require("../../model/DAO/genero/genero.js")



//Função para inserir um novo genero
async function inserirNovoGenero(genero,conteType) {

    //criando clone  do objeto json para manipular a estrutura local sem modificar o original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if (String(conteType).toLocaleLowerCase()== 'application/json') {
            
            let validar = await validarDados(genero)

            //se validar retornanr algo significa que é json de ero e ja sera retornado 
            if(validar){
                return validar
            }else{
                // manda os genero para o DAO
                let result = await GeneroDAO.insertGenero(genero)

                if (result) {

                    genero.id = result// coloca o id ao cargo apos ele ser inserido no banco 
                    message.DEFAULT_MESSAGE.status      = message.SUCESS_CREATED_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCESS_CREATED_ITEM.status_code
                    message.DEFAULT_MESSAGE.message     = message.SUCESS_CREATED_ITEM.message
                    message.DEFAULT_MESSAGE.response    = genero
                        
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


//FEITO
//funcao para atalizar genero
async function atualizarGenero(genero, id, contentType) {
    let message = JSON.parse(JSON.stringify(config_message))
   

    try {
        //validacao pra aceitar apenas json
        if (String(contentType).toLocaleLowerCase() == 'application/json') {

            let restulBuscarId =await buscarGenero(id)
            //
            if (restulBuscarId.status) {
                let validar = await validarDados(genero)
                if (!validar) {
                    
                    //adiciona o atributo id do filme no json para ser nviado no json
                    genero.id = id
                    //chama a funcao do dao pra atualizar filme de dentro do banco de dados
                    let result = await GeneroDAO.updateGenero(genero)


                    if (result) {
                        message.DEFAULT_MESSAGE.status      = message.SUCESS_UPADATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCESS_UPADATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message     = message.SUCESS_UPADATE_ITEM.message  
                        message.DEFAULT_MESSAGE.response    = genero
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
async function listarGenero() {
    
    let message = JSON.parse(JSON.stringify(config_message))
    
    try {
        let result = await GeneroDAO.selectAllGenero()

        //valida se  DAO conseguiu processar os dados
        if (result) {
            // valida se a array de retorno do DAO tem algo dentro
            if (result.length>0) {
                //poem o status , o codigo de status e a msg com os filmes
                message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count    = result.length
                message.DEFAULT_MESSAGE.response.genero    = result
                
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
async function buscarGenero(id) {
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
           // let result = await CargoDAO.selectByIdCargo(id)
            let result = await GeneroDAO.selectByIdGenero(id)

            if (result) {
                if (result.length>0) {
                    message.DEFAULT_MESSAGE.status            = message.SUCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code       = message.SUCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.cargo    = result
                    
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


//funcao pra apagar filme
async function apagarGenero(id) {
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let restulBuscarId =await buscarGenero(id)
            //
        if (restulBuscarId.status) {
      
             //chama a funcao do dao pra deletar cargo de dentro do banco de dados
            let result = await GeneroDAO.deleteGenero(id)



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
async function validarDados(genero) {
     //criando clone  do objeto json para manipular a estrutura local sem modificar o original
     let message = JSON.parse(JSON.stringify(config_message))


     //VALIDA cargo
     if(genero.genero == undefined    || genero.genero == ""      || genero.genero == null     ||  genero.genero.length >  45){
        message.ERROR_BAD_REQUEST.field = "[genero] invalido"
        return message.ERROR_BAD_REQUEST
   
    }else{return false }
    
}

module.exports = {
    inserirNovoGenero,
    listarGenero,
    buscarGenero,
    atualizarGenero,
    apagarGenero,
}
