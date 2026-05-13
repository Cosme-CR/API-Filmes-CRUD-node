
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


#################################################
create table tbl_clasificacao(
	id		 			int not null primary key auto_increment,
    clasificacao	 	varchar(80) not null,
	caracteristica	 	varchar(80) not null
);

##############################################################
create table tbl_pessoa(
	id		 			int not null primary key auto_increment,
    nome	 			varchar(80) not null,
	data_nascimento	 	date not null,
    biografia			text,
    foto 				varchar(255)
    
);

show tables;

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