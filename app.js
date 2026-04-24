const express       = require("express")
const cors          = require("cors")
const boddyParser   = require("body-parser")

//impot das controlers do projeto
const controlerFilme = require("./controller/filme/controller_filme.js")

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

 
app.post("/v1/senai/locadora/filme", boddyParserJSON, async function(request,response){

    // recebe o conteudo dentro do body da requisição
    let dados = request.body
    let conteType = request.headers['content-type']

    //console.log(request.headers)

    let result = await controlerFilme.inserirNovoFilme(dados,conteType)
    
    response.status(result.status_code)
    response.json(result)
    
})

app.get("/v1/senai/locadora/filme/:id", async function(request,response){

    // recebe o id
    let id = request.params.id



    let result = await controlerFilme.buscarFilme(id)
    
    response.status(result.status_code)
    response.json(result)
    
})



app.get("/v1/senai/locadora/filme", async function(request,response){
    let result = await controlerFilme.listarFilmes()

    response.status(result.status_code)
    response.json(result)
   
    
})







//serve pra iniciar a api
app.listen(8080,function(){console.log("api funcionando em http://localhost:8080")})
