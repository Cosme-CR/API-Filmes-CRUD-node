/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela nascionalidade
* Data:       13/03/2026
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
async function insertNascionalidade(nascionalidade){

    try {
        //script pra onserir cargo no banco de dados
        let sql = `insert into tbl_nascionalidade(
                            nascionalidade
                        )
                    values(
                            '${nascionalidade.nascionalidade}'); `
        
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

//função para atualiza um cargo existente na tabela
async function updateNascionalidade(nascionalidade) {

    try {
        //script para atualizar dados no BD
        let sql =`update tbl_Nascionalidade set
            nascionalidade = '${nascionalidade.nascionalidade}'`

        //executa o script acima de
        let result = await knexConex.raw(sql)
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }

    
}

//funcao para retornar todos os dados da tabela de cargo
async function selectAllNascionalidade() {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_nascionalidade order by id desc`

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


//função para retornar os dados do cargo filtrando pelo id
async function selectByIdNascionalidade(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_nascionalidade where id=${id}`

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

//funcao pra excluirCargo pelo id
async function deleteNascionalidade(id) {
    try {
        let sql = `DELETE FROM tbl_nascionalidade 
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
    insertNascionalidade,
    updateNascionalidade,
    selectAllNascionalidade,
    selectByIdNascionalidade,
    deleteNascionalidade

}
