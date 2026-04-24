/*****************************************************************************************
 * Objetivo:    arquivo responsavel pela configuracao e padronizacao das mensagens
 * Data:        17/04/2025
 * Autor:       Cosme
 * Versao:      1.0
 *****************************************************************************************/
//const { response } = require("express");
//const { development } = require("../../model/database_config_knex/knexFile");

 
//padronizacao de cabeçalho para retorno dos end points da API
const DEFAULT_MESSAGE = {
    api_description:    "API para gerenciar o controle de filmes",
    development:        "Cosme Ribeiro",
    version:            "1.0.4.26",
    status:             Boolean,
    status_code:        Number,
    response:           {}
}

//msgs de erro da api
const ERROR_INTERNAL_SERVER_MODEL ={
    status:             false,
    status_code:        500,
    message:            "nao foi possivel processar a requisicao por conta de erro na api[erro na modelagem de dados ] "
}

const ERROR_INTERNAL_SERVER_CONTROLLER ={
    status:             false,
    status_code:        500,
    message:            "nao foi possivel processar a requisicao por conta de erro na api[ERRO NA CONTROLLER ] "
}

const ERROR_BAD_REQUEST ={
    status:             false,
    status_code:        400,
    message:            "os dados enviado na requisicao nao estao corretos "
}

const ERROR_NOT_FOUND ={
    status:             false,
    status_code:        404,
    message:            "nao foi encontrado nenhum dado para retorno"
}

const ERROR_CONTENT_TYPE ={
    status:             false,
    status_code:        415,
    message:            "nao foi possivel processar a requisicao pois o tipo de dado aceito pela api é so json"
}


// mensagem  na api
const SUCESS_CREATED_ITEM = {
    status:             true,
    status_code:        201,
    message:            "registro inserido"

}

const SUCESS_RESPONSE = {
    status:             true,
    status_code:        200,
}

module.exports = {
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE, 
    ERROR_NOT_FOUND,
    SUCESS_RESPONSE
}