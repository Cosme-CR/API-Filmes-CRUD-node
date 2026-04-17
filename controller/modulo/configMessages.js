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
const ERROR_BAD_REQUEST ={
    status:             false,
    status_code:        400,
    message:            "os dados enviado na requisicao nao estao corretos "
}

// mensagem de erro na api
const SUCESS_CREATED_ITEM = {
    status:             true,
    status_code:        201,
    message:            "registro inserido"

}

module.exports{
    DEFAULT_MESSAGE,
    ERROR_BAD_REQUEST,
    SUCESS_CREATED_ITEM
}