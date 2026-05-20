/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela pais
* Data:       20/05/2026
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
async function insertPais(pais){

    try {
        //script pra onserir pais no banco de dados
        let sql = `insert into tbl_pais(
                            pais
                        )
                    values(
                            '${pais.pais}'); `
        
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

//função para atualiza um pais existente na tabela
async function updatePais(pais) {

    try {
        //script para atualizar dados no BD
        let sql =`update tbl_pais set
            pais = '${pais.pais}'
                where id = ${pais.id}`

        //executa o script acima de
        let result = await knexConex.raw(sql)
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }

    
}

//funcao para retornar todos os dados da tabela 
async function selectAllPais() {
    try {
        //script select pra ver todos os filmes
        let sql = `select * from tbl_pais order by id desc`

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


//função para retornar os dados do pais filtrando pelo id
async function selectByIdPais(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_pais where id=${id}`

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

//funcao pra excluir pelo id
async function deletePais(id) {
    try {
        let sql = `DELETE FROM tbl_pais 
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
    insertPais,
    updatePais,
    selectAllPais,
    selectByIdPais,
    deletePais

}