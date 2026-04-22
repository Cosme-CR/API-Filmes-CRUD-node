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

    let result = await controlerFilme.inserirNovoFilme(dados)
    console.log(result)
    response.status(result.status_code)
    response.json(result)

   
    
})







//serve pra iniciar a api
app.listen(8080,function(){console.log("api funcionando em http://localhost:8080")})
