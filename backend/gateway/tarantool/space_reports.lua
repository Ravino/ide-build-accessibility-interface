\set language sql


create table reports (report_id UNSIGNED UNIQUE PRIMARY KEY NOT NULL AUTOINCREMENT, user_id UNSIGNED NOT NULL, name TEXT NOT NULL, path TEXT NOT NULL, url TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, body TEXT NOT NULL, uuid TEXT NOT NULL)
