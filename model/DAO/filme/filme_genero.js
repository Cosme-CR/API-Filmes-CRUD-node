/******************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD no Banco de dados MySQL na tabela
 *           de relação entre Filme e Genero
 * Data: 27/05/2026
 * Autor: Cosme Ribeiro
 * Versão: 1.1
 ******************************************************************************/

const knex          = require('knex')
const knexConfig    = require('../../database_config_knex/knexFile.js')
const knexConex     = knex(knexConfig.development)

const insertFilmeGenero = async function(filmeGenero){
    try {
        let sql = `insert into tbl_genero_filme (id_filme, id_genero)
                    values (${filmeGenero.id_filme}, ${filmeGenero.id_genero});`
        let result = await knexConex.raw(sql)
        if(result) return result[0].insertId 
        else return false
    } catch (error) {
        return false
    }
}

const updateFilmeGenero = async function(filmeGenero){
    try {
        let sql = `update tbl_genero_filme set 
                        id_filme            = '${filmeGenero.id_filme}',
                        id_genero           = '${filmeGenero.id_genero}'	
                    where id = ${filmeGenero.id}`
        let result = await knexConex.raw(sql)
        return !!result
    } catch (error) {
        return false
    }
}

const selectAllFilmeGenero = async function(){
    try {
        let sql = `select * from tbl_genero_filme order by id desc`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)) return result[0]
        else return false
    } catch (error) {
        return false
    }
}

const selectByIdFilmeGenero = async function(id){
    try {
        let sql = `select * from tbl_genero_filme where id=${id}`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)) return result[0]
        else return false
    } catch (error) {
        return false
    }
}

const selectFilmesByIdGenero = async function(idGenero){
    try {
        let sql = `select tbl_filme.*
                    from tbl_filme
                        inner join tbl_genero_filme
                            on tbl_filme.id = tbl_genero_filme.id_filme
                    where tbl_genero_filme.id_genero=${idGenero}`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)) return result[0]
        else return false
    } catch (error) {
        return false
    }
}

const selectGenerosByIdFilme = async function(idFilme){
    try {
        let sql = `select tbl_genero.*
                    from tbl_genero
                        inner join tbl_genero_filme
                            on tbl_genero.id = tbl_genero_filme.id_genero
                    where tbl_genero_filme.id_filme=${idFilme}`
        let result = await knexConex.raw(sql)
        if(Array.isArray(result)) return result[0]
        else return false
    } catch (error) {
        return false
    }
}

const deleteFilmeGenero = async function(id){
    try {
        let sql = `delete from tbl_genero_filme where id=${id}`
        let result = await knexConex.raw(sql)
        return !!result
    } catch (error) {
        return false
    }
}

const deleteGeneroByFilme = async function(idFilme){
    try {
        let sql = `delete from tbl_genero_filme where id_filme=${idFilme}`
        let result = await knexConex.raw(sql)
        return !!result
    } catch (error) {
        return false
    }
}

module.exports = {
    insertFilmeGenero,
    updateFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    selectFilmesByIdGenero,
    selectGenerosByIdFilme,
    deleteFilmeGenero,
    deleteGeneroByFilme
}
