const express       = require("express")
const cors          = require("cors")
const boddyParser   = require("body-parser")

//impot das controlers do projeto
const controlerFilme = require("./controller/filme/controller_filme.js")
const controlerCargo = require("./controller/cargo/controller_cargo.js")
const controlerGenero = require("./controller/genero/controler_genero.js")



//criando um objeto para manipular dados do body da api em forato json
const boddyParserJSON = boddyParser.json()

// criar um objeto pra manioular o express
const app = express()

const corsOptions ={
    origin:["*"],  //origem da requisisao podenendo ser um ip ou um * que significa todos
    methods:"GET,POST,PUT,DELETE,OPTIONS", // metodos que serao liberados na api
    allowedHeaders:["Content-Type", "Authorization"],//sao permissoes de cabecalho do cors
}
//configura as permisooes da api pelo cors
app.use(cors(corsOptions))

//inserir filme
app.post("/v1/senai/locadora/filme", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)

    let result = await controlerFilme.inserirNovoFilme(dados,conteType)
    
    response.status(result.status_code)
    response.json(result)
    
})

//buscar filme
app.get("/v1/senai/locadora/filme/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerFilme.buscarFilme(id)
    
    response.status(result.status_code)
    response.json(result)
    
})


//listra filmes
app.get("/v1/senai/locadora/filme", async function(request,response){
    let result = await controlerFilme.listarFilmes()

    response.status(result.status_code)
    response.json(result)
   
    
})

//atualizar filme
app.put("/v1/senai/locadora/filme/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerFilme.atualizarFilme(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

//deletar filme
app.delete("/v1/senai/locadora/filme/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerFilme.apagarFilme(id)

    response.status(result.status_code)
    response.json(result)
})


//////////////////////////////////////////////////////////////////////////
//CARGO
///////////////////////////////////////////////////////////////////////////
//inserir cargo
app.post("/v1/senai/locadora/cargo", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)
                       
    let result = await controlerCargo.inserirNovoCargo(dados,conteType)
    
    response.status(result.status_code)
    response.json(result)
    
})


//atualizar cargo
app.put("/v1/senai/locadora/cargo/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerCargo.atualizarCargo(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})



//buscar cargo
app.get("/v1/senai/locadora/cargo/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerCargo.buscarCargo(id)
    
    response.status(result.status_code)
    response.json(result)
    
})

//listra cargo
app.get("/v1/senai/locadora/cargo", async function(request,response){
    let result = await controlerCargo.listarCargos()


    response.status(result.status_code)
    response.json(result)
   
    
})



//deletar cargo
app.delete("/v1/senai/locadora/cargo/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerCargo.apagarCargo(id)


    response.status(result.status_code)
    response.json(result)
})


//////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////
//genero
///////////////////////////////////////////////////////////////////////////
//inserir genero
app.post("/v1/senai/locadora/genero", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)
                       
    let result = await controlerGenero.inserirNovoGenero(dados,conteType)

    
    response.status(result.status_code)
    response.json(result)
    
})


//serve pra iniciar a api
app.listen(8080,function(){console.log("api funcionando em http://localhost:8080")})
