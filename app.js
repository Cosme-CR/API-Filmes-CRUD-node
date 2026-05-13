const express       = require("express")
const cors          = require("cors")
const boddyParser   = require("body-parser")

//impot das controlers do projeto
const controlerFilme = require("./controller/filme/controller_filme.js")
const controlerCargo = require("./controller/cargo/controller_cargo.js")
const controlerGenero = require("./controller/genero/controler_genero.js")

const controlerClasificacao = require("./controller/clasificacao/controler_clasificacao.js")
const controlerNascionalidade = require("./controller/nascionalidade/controler_nascionalidade.js")
const controlerPessoa = require("./controller/pessoa/controler_pessoa.js")





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



//atualizar genero
app.put("/v1/senai/locadora/genero/:id", boddyParserJSON, async function(request,response){
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
app.get("/v1/senai/locadora/genero/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerGenero.buscarGenero(id)
    
    response.status(result.status_code)
    response.json(result)
    
})

//listra genero
app.get("/v1/senai/locadora/genero", async function(request,response){
    let result = await controlerGenero.listarGenero()


    response.status(result.status_code)
    response.json(result)
   
    
})


//deletar genero
app.delete("/v1/senai/locadora/genero/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerGenero.apagarGenero(id)


    response.status(result.status_code)
    response.json(result)
})
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////




//inserir clasificacao
app.post("/v1/senai/locadora/clasificacao", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)

    let result = await controlerClasificacao.inserirNovoClasificacao(dados,conteType)

    
    response.status(result.status_code)
    response.json(result)
    
})

//buscar clasificacao
app.get("/v1/senai/locadora/clasificacao/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerClasificacao.buscarClasificacao(id)
    
    response.status(result.status_code)
    response.json(result)
    
})


//listra clasificacao
app.get("/v1/senai/locadora/clasificacao", async function(request,response){
    let result = await controlerClasificacao.listarClasificacao()


    response.status(result.status_code)
    response.json(result)
   
    
})

//atualizar clasificacao
app.put("/v1/senai/locadora/clasificacao/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerClasificacao.atualizarClasificacao(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

//deletar clasificacao
app.delete("/v1/senai/locadora/clasificacao/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerClasificacao.apagarClasificacao(id)

    response.status(result.status_code)
    response.json(result)
})


//////////////////////////////////////////////////////////////////////////
/////////////////////////////////
//////////////


//inserir nascionalidade
app.post("/v1/senai/locadora/nascionalidade", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)

    let result = await controlerNascionalidade.inserirNovoNascionalidade(dados,conteType)

    
    response.status(result.status_code)
    response.json(result)
    
})

//buscar nascionalidade
app.get("/v1/senai/locadora/nascionalidade/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerNascionalidade.buscarNascionalidade(id)
    
    response.status(result.status_code)
    response.json(result)
    
})


//listra nascionalidade
app.get("/v1/senai/locadora/nascionalidade", async function(request,response){
    let result = await controlerNascionalidade.listarNascionalidade()


    response.status(result.status_code)
    response.json(result)
   
    
})

//atualizar clasificacao
app.put("/v1/senai/locadora/nascionalidade/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerNascionalidade.atualizarNascionalidade(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

//deletar nascionalidade
app.delete("/v1/senai/locadora/nascionalidade/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerNascionalidade.apagarNascionalidade(id)

    response.status(result.status_code)
    response.json(result)
})


//////////////////////////////////////////////////////////////////////////


/////////////////
///////////





//inserir pessoa
app.post("/v1/senai/locadora/pessoa", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)

    let result = await controlerPessoa.inserirNovoPessoa(dados,conteType)

    
    response.status(result.status_code)
    response.json(result)
    
})

//buscar pessoa
app.get("/v1/senai/locadora/pessoa/:id", async function(request,response){

    // recebe o id
    let id = request.params.id

    let result = await controlerPessoa.buscarPessoa(id)
    
    response.status(result.status_code)
    response.json(result)
    
})


//listra pessoa
app.get("/v1/senai/locadora/pessoa", async function(request,response){
    let result = await controlerPessoa.listarPessoa()


    response.status(result.status_code)
    response.json(result)
   
    
})

//atualizar pessoa
app.put("/v1/senai/locadora/pessoa/:id", boddyParserJSON, async function(request,response){
    //recebe o content type da requisicao
    let contentType = request.headers['content-type']
    //recebe o id do registro a ser atualizado
    let id = request.params.id
    //recebe os dados enviados no corpo da requisisao
    let dados =request.body
    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerPessoa.atualizarPessoa(dados,id,contentType)

    response.status(result.status_code)
    response.json(result)
})

//deletar pessoa
app.delete("/v1/senai/locadora/pessoa/:id", async function(request,response){
   
    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //chama a funcao de atualizar na controler e encaminha os dados , id e contenttype
    let result = await controlerPessoa.apagarPessoa(id)

    response.status(result.status_code)
    response.json(result)
})


//////////////////////////////////////////////////////////////////////////


//serve pra iniciar a api
app.listen(8080,function(){console.log("api funcionando em http://localhost:8080")})
