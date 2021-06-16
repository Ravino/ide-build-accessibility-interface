\set language sql

create table mail_appeals (mail_appeal_id UNSIGNED NOT NULL PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, readed BOOLEAN NOT NULL, answered BOOLEAN NOT NULL, uuid TEXT)
