/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela genero
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
async function insertGenero(genero){

    try {
        //script pra onserir filme no banco de dados
        let sql = `insert into tbl_genero(
                        genero
                        )
                    values(
                        '${genero.genero}'); `
        
        //executa o scriptSQL no banco de dados
        let result = await knexConex.raw(sql)
        //console.log(result[0].insertId)
        if(result){
            return result[0].insertId// retorna o id 
        }else{return false}
    } catch (error) {
        //console.log(error)//erro 500 descomentar essa linha
        return false
    }

}

//função para atualiza um filme existente na tabela
async function updateGenero(genero) {


    try {
        //script para atualizar dados no BD
        let sql =`update tbl_genero set
            genero = '${genero.genero}'
            where id = ${genero.id}`

        //executa o script acima de
        let result = await knexConex.raw(sql)
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }

}

//funcao para retornar todos os dados da tabela de filme
async function selectAllGenero() {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_genero order by id desc`

        // executa o script no banco
        let result = await knexConex.raw(sql)

        // verifica se o script retornou um array
        if (Array.isArray(result)) {
            return result[0] 
        }else{
            return false
        }

    } catch (error) {
        //console.log(error)
        return false 
        
    }

}


//função para retornar os dados do filme filtrando pelo id
async function selectByIdGenero(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_genero where id=${id}`

        let result = await knexConex.raw(sql)
        if (Array.isArray(result)) {
            return result[0]
        }else{
            return false
        }

    } catch (error) {
        return false
    }
    
}

//funcao pra excluir um filme pelo id
async function deleteGenero(id) {
    try {
        let sql = `DELETE FROM tbl_genero 
                        WHERE id = ${id};`

        let result = await knexConex.raw(sql)
        if(result){
            return true 
        }else{return false}

    } catch (error) {
        return false
    }
    
} 

module.exports = {
    insertGenero,
    updateGenero,
    selectAllGenero,
    selectByIdGenero,
    deleteGenero

}