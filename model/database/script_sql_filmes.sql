
create database db_filme_20261_a;

use db_filme_20261_a;

create table tbl_filme(
	id		 			int not null primary key auto_increment,
    nome	 			varchar(80) not null,
	data_lancamento	 	date not null,
    duracao				time not null,
    sinopse				text not null,
    avaliacao 			decimal(3,2) default null,
    valor 				decimal(5,2) not null default 0, 
    capa 				varchar(255)
    

);


#///////////////////////////////////////////
create table tbl_cargo(
	id		 			int not null primary key auto_increment,
    cargo	 			varchar(45) not null
);

#################################################
create table tbl_nascionalidade(
	id		 			int not null primary key auto_increment,
    nascionalidade	 	varchar(40) not null
    
);

#####################################################
create table tbl_genero(
	id		 			int not null primary key auto_increment,
    genero	 			varchar(40) not null
);

##############################################################
create table tbl_pessoa(
	id		 			int not null primary key auto_increment,
    nome	 			varchar(80) not null,
	data_nascimento	 	date not null,
    biografia			text,
    foto 				varchar(255)
    
);





#
#
#
#modificacaoes e adicoes feita
#////////////////////////////////////////////////////////////////////////
#################################################
create table tbl_pais(
	id		 			int not null primary key auto_increment,
    pais	 	varchar(100) not null
    
);




drop table tbl_clasificao_filme_pais;
drop table tbl_clasificacao;
create table tbl_classificacao(
	id		 			int not null primary key auto_increment,
    sigla				varchar(10) not null,
    clasificacao	 	varchar(80) not null,
	caracteristica	 	varchar(80) not null
);

create table  tbl_classificacao_filme_pais(
	id		 			int not null primary key auto_increment,
	id_pais			int not null,
    id_filme			int not null,
	id_classificacao			int not null,
    
	#fazer relacao entre duas tabelas 
    constraint			FK_PAIS_CLASSIFICACAOFILMEPAIS	      # nome do relacionamento
    foreign key			(id_pais)				        # quem sera a FK natabla FK(foren key)
    references			tbl_pais(id),				# de onde vem a FK
    
    #fazer relacao entre duas tabelas 
    constraint			FK_FILME_CLASSIFICACAOFILMEPAIS	      # nome do relacionamento
    foreign key			(id_filme)				        # quem sera a FK natabla FK(foren key)
    references			tbl_filme(id),				# de onde vem a FK
    
    
				
    
	#fazer relacao entre duas tabelas 
    constraint			FK_CLASSIFICACAO_CLASSIFICACAOFILMEPAIS	      # nome do relacionamento
    foreign key			(id_classificacao)				        # quem sera a FK natabla FK(foren key)
    references			tbl_classificacao(id)				# de onde vem a FK
);










create table  tbl_genero_filme(
	id		 			int not null primary key auto_increment,
	id_filme			int not null,
    id_genero			int not null,
    
    #fazer relacao entre duas tabelas 
    constraint			FK_FILME_GENEROFILME	      # nome do relacionamento
    foreign key			(id_filme)				        # quem sera a FK natabla FK(foren key)
    references			tbl_filme(id),				# de onde vem a FK
    
    
	#fazer relacao entre duas tabelas 
    constraint			FK_GENERO_GENEROFILME	      # nome do relacionamento
    foreign key			(id_genero)				        # quem sera a FK natabla FK(foren key)
    references			tbl_genero(id)				# de onde vem a FK
);
#///////////////////////////////////////////////////////////////////////////
create table  tbl_nascionalidade_pesoa(
	id		 			int not null primary key auto_increment,
	id_pessoa			int not null,
    id_nascionalidade			int not null,
    
    #fazer relacao entre duas tabelas 
    constraint			FK_PESSOA_NASCIONALIDADEPESSOA	      # nome do relacionamento
    foreign key			(id_pessoa)				        # quem sera a FK natabla FK(foren key)
    references			tbl_pessoa(id),				# de onde vem a FK
    
    
	#fazer relacao entre duas tabelas 
    constraint			FK_NASCIONALIDADE_NASCIONALIDADE	      # nome do relacionamento
    foreign key			(id_nascionalidade)				        # quem sera a FK natabla FK(foren key)
    references			tbl_nascionalidade(id)				# de onde vem a FK
);

#////////////////////////////////////////////////////////
create table  tbl_producao_filme(
	id		 			int not null primary key auto_increment,
	id_filme			int not null,
    id_cargo			int not null,
	id_pessoa			int not null,
    
    #fazer relacao entre duas tabelas 
    constraint			FK_FILME_PRODUCAOFILME	      # nome do relacionamento
    foreign key			(id_filme)				        # quem sera a FK natabla FK(foren key)
    references			tbl_filme(id),				# de onde vem a FK
    
    
	#fazer relacao entre duas tabelas 
    constraint			FK_CARGO_PRODUCAOFILME	      # nome do relacionamento
    foreign key			(id_cargo)				        # quem sera a FK natabla FK(foren key)
    references			tbl_cargo(id),				# de onde vem a FK
    
	#fazer relacao entre duas tabelas 
    constraint			FK_PESSOA_PRODUCAOFILME	      # nome do relacionamento
    foreign key			(id_pessoa)				        # quem sera a FK natabla FK(foren key)
    references			tbl_pessoa(id)				# de onde vem a FK
);
#///////////////////////////////////////////////////////////////////////////////////////////////////////////
#
#
#
#inserir dados

insert into tbl_filme(
						nome, 
                        data_lancamento, 
                        duracao, 
                        sinopse, 
                        avaliacao, 
                        valor,
                        capa )
				values(
						'super mario galaxy: O Filme',
						'2026-04-02',
						'01:39:00',
                        'Mario embarca em uma nova aventura espacial com galáxias inéditas e desafios ainda mais complexos.',
                        '3',
                        '57.7',
                        'https://br.web.img3.acsta.net/img/0a/7d/0a7d99a5da13669f1edde9d6ec00058d.jpg'
                        );
                        
				
                #mostra todos dados da tabela
select * from tbl_filme;

#atualiza dado
update tbl_filme set
		nome = "nova nome", 
		data_lancamento = "2000-01-01", 
		duracao = "02:00", 
		sinopse = "nova sinopse", 
		avaliacao = "2", 
		valor = "10",
		capa = "nova capa"
	where id = 5;

DELETE FROM tbl_filme 
	WHERE id = 13;