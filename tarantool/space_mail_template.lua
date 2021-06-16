\set language sql
CREATE TABLE mail_templates (mail_template_id UNSIGNED PRIMARY KEY NOT NULL AUTOINCREMENT, name TEXT NOT NULL, language TEXT NOT NULL, subject TEXT NOT NULL, body TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, uuid TEXT NOT NULL)
