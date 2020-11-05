create database stock;
create table `parts`(
	`id` int(100) not null primary key auto_increment,
    `serial_id` int(50) not null,
    `title_rus` varchar(500),
    `title_latin` varchar(500)
);
create table `stock_parts`(
`id` int not null auto_increment primary key,
`printer` varchar(100) not null,
`part` varchar(500) not null,
`current_amount` int(100) not null,
`type` varchar(100) not null,
`amount` int(100) not null,
`date` varchar(100) not null
);