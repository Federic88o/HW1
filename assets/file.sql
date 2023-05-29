create table utenti(
nome_completo varchar(20),
username varchar(20) primary key,
email varchar(20),
password varchar(20)
);

create table preferiti(
username varchar(20) references utenti(username),
img_preferiti varchar(200),
tipo varchar(5),
razza varchar(50),
voto integer,
primary key(username, img_preferiti)
);

create table profilo(
username varchar(20) references utenti(username),
img_profilo varchar(200),
primary key(username, img_profilo)
);