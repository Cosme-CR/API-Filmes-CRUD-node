/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela filme
* Data:       15/04?2026
* Autor :     cosme
* Versao:     1.0  

*/

//import da biblioteca para gerenciar o banco de dados mysql no node.js
const knex          = require('knex')
//importe do arquivo de configuração para conexao com o banco de dados mysql 
const knexConfig    = require('../../database_config_knex/knexFile.js')
//cria a conexao com o banco de dados
const knexConex     = knex(knexConfig.development)

//funcao para inserir dados na tabela de filmes 
async function insertFilme(filme){

    try {

        let sql = `insert into tbl_filme(
                            nome, 
                            data_lancamento, 
                            duracao, 
                            sinopse, 
                            avaliacao, 
                            valor,
                            capa 
                        )
                    values(
                            '${filme.nome}',
                            '${filme.data_lancamento}',
                            '${filme.duracao}',
                            '${filme.sinopse}',
                            if('${filme.avaliacao}' = "", null,'${filme.avaliacao}'),
                            '${filme.valor}',
                            '${filme.capa}'
                            ); `
        
        //executa o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
        if(result){
            return true 
        }else{return false}
    } catch (error) {
        //console.log(error)//erro 500 descomentar essa linha
        return false
    }

}

//função para atualiza um filme existente na tabela
async function updateFilme(filme) {
    
}

//funcao para retornar todos os dados da tabela de filme
async function selectAllFilme() {
    
}

//função para retornar os dados do filme filtrando pelo id
async function selectByIdFilme(id) {
    
}

//funcao pra excluir um filme pelo id
async function deleteFilme(id) {
    
} 

module.exports = {
    insertFilme,
    updateFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme

}