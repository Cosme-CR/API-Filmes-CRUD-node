
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
                        
                        
select * from tbl_filme;