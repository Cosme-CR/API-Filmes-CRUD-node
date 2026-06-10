// importe do express
const controlerGenero = require("../controller/genero/controler_genero.js")


const boddyParser   = require("body-parser")
const boddyParserJSON = boddyParser.json()
const express = require("express")

//cria objeto de rota para o arquivo
const router = express.Router()

//inserir genero
router.post("/", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)
                       
    let result = await controlerGenero.inserirNovoGenero(dados,conteType)

    
    response.status(result.status_code)
    response.json(result)
    
})

//atualizar genero
router.put("/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerGenero.atualizarGenero(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

//buscar genero
router.get("/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerGenero.buscarGenero(id)
    
    response.status(result.status_code)
    response.json(result)
    
})

//listra genero
router.get("/", async function(request,response){
    let result = await controlerGenero.listarGenero()


    response.status(result.status_code)
    response.json(result)
   
    
})

//deletar genero
router.delete("/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerGenero.apagarGenero(id)


    response.status(result.status_code)
    response.json(result)
})
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//exporte pro app ter acessoas rota do genero
module.exports = router