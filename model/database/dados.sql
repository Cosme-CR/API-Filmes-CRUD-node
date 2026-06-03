-- CARGOS
INSERT INTO tbl_cargo (cargo) VALUES
('Ator'),
('Atriz'),
('Diretor'),
('Produtor'),
('Roteirista');

-- NACIONALIDADES
INSERT INTO tbl_nascionalidade (nascionalidade) VALUES
('Brasileira'),
('Estadunidense'),
('Britânica'),
('Canadense'),
('Australiana');

-- GÊNEROS
INSERT INTO tbl_genero (genero) VALUES
('Ação'),
('Aventura'),
('Ficção Científica'),
('Drama'),
('Comédia'),
('Terror');

-- PAÍSES
INSERT INTO tbl_pais (pais) VALUES
('Brasil'),
('Estados Unidos'),
('Reino Unido'),
('Canadá'),
('Austrália');

-- CLASSIFICAÇÕES
INSERT INTO tbl_classificacao
(sigla, classificacao, caracteristica)
VALUES
('L', 'Livre', 'Sem restrições'),
('10', '10 anos', 'Violência leve'),
('12', '12 anos', 'Temas sensíveis'),
('14', '14 anos', 'Violência moderada'),
('16', '16 anos', 'Conteúdo intenso'),
('18', '18 anos', 'Conteúdo adulto');

-- FILMES
INSERT INTO tbl_filme
(nome, data_lancamento, duracao, sinopse, avaliacao, valor, capa)
VALUES
(
'Interestelar',
'2014-11-07',
'02:49:00',
'Uma equipe viaja pelo espaço em busca de um novo lar para a humanidade.',
8.70,
29.90,
'interestelar.jpg'
),
(
'Cidade de Deus',
'2002-08-30',
'02:10:00',
'História da violência e do crescimento de uma favela carioca.',
8.60,
19.90,
'cidade_de_deus.jpg'
),
(
'Avatar',
'2009-12-18',
'02:42:00',
'Um ex-fuzileiro explora o planeta Pandora.',
7.90,
24.90,
'avatar.jpg'
);

-- PESSOAS
INSERT INTO tbl_pessoa
(nome, data_nascimento, biografia, foto)
VALUES
(
'Christopher Nolan',
'1970-07-30',
'Diretor e roteirista britânico.',
'nolan.jpg'
),
(
'Matthew McConaughey',
'1969-11-04',
'Ator norte-americano.',
'matthew.jpg'
),
(
'Fernando Meirelles',
'1955-11-09',
'Diretor brasileiro.',
'meirelles.jpg'
),
(
'Alexandre Rodrigues',
'1983-05-21',
'Ator brasileiro.',
'alexandre.jpg'
),
(
'James Cameron',
'1954-08-16',
'Diretor canadense.',
'cameron.jpg'
),
(
'Sam Worthington',
'1976-08-02',
'Ator australiano.',
'sam.jpg'
);

-- NACIONALIDADE DAS PESSOAS
INSERT INTO tbl_nascionalidade_pesoa
(id_pessoa, id_nascionalidade)
VALUES
(1,3),
(2,2),
(3,1),
(4,1),
(5,4),
(6,5);

-- GÊNEROS DOS FILMES
INSERT INTO tbl_genero_filme
(id_filme, id_genero)
VALUES
(1,3),
(1,2),
(2,4),
(3,3),
(3,2);

-- PRODUÇÃO DOS FILMES
INSERT INTO tbl_producao_filme
(id_filme, id_cargo, id_pessoa)
VALUES
(1,3,1),
(1,1,2),
(2,3,3),
(2,1,4),
(3,3,5),
(3,1,6);

-- CLASSIFICAÇÃO DOS FILMES POR PAÍS
INSERT INTO tbl_classificacao_filme_pais
(id_pais, id_filme, id_classificacao)
VALUES
(2,1,4),
(1,2,5),
(2,3,4);