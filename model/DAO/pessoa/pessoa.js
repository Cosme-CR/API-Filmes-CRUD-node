/* 
* objetivo: arquivo responsavel pelo CRUD no banco de dados MySQL na tabela pessoa
* Data:       13/05/2026
* Autor :     cosme
* Versao:     1.0  

*/

//import da biblioteca para gerenciar o banco de dados mysql no node.js
const knex          = require('knex')
//importe do arquivo de configuração para conexao com o banco de dados mysql 
const knexConfig    = require('../../database_config_knex/knexFile.js')
//cria a conexao com o banco de dados
const knexConex     = knex(knexConfig.development)

//funcao para inserir dados na tabela de pessoa
async function insertPessoa(pessoa){

    try {
        //script pra onserir filme no banco de dados
        let sql = `insert into tbl_pessoa(
                            nome, 
                            data_nascimento, 
                            biografia, 
                            foto
                        )
                    values(
                            '${pessoa.nome}',
                            '${pessoa.data_nascimento}',
                            '${pessoa.biografia}',
                            '${pessoa.foto}'); `
        
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

//função para atualiza uma pessoa existente na tabela
async function updatePessoa(pessoa) {


    try {
        //script para atualizar dados no BD
        let sql =`update tbl_pessoa set
            nome =              '${pessoa.nome}', 
            data_nascimento =   '${pessoa.data_nascimento}',
            biografia =         '${pessoa.biografia}',
            foto =              '${pessoa.foto}'
            where id =           ${pessoa.id}`

        //executa o script acima de
        let result = await knexConex.raw(sql)
        
        if (result) {
            return true
        }else{return false}
        
    } catch (error) {
        return false
    }


    
}

//funcao para retornar todos os dados da tabela de pessoa
async function selectAllPessoa() {
    try {
        //script select pra ver todos os pessoa
        let sql = `select * from tbl_pessoa order by id desc`

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


//função para retornar os dados da pesoa filtrando pelo id
async function selectByIdPessoa(id) {
    try {
        // faz busca no banco de dados pelo id 
        let sql = `select * from tbl_pessoa where id=${id}`

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

//funcao pra excluir uma pessoa pelo id
async function deletePessoa(id) {
    try {
        let sql = `DELETE FROM tbl_pessoa 
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
    insertPessoa,
    updatePessoa,
    selectAllPessoa,
    selectByIdPessoa,
    deletePessoa

}
