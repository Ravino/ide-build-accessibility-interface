\set language sql
CREATE TABLE sessions (session_id UNSIGNED UNIQUE NOT NULL primary key autoincrement, user_id UNSIGNED NOT NULL, bind_token TEXT NOT NULL, created_at UNSIGNED NOT NULL, updated_at UNSIGNED NOT NULL, ip_address TEXT NOT NULL, country TEXT NOT NULL, region TEXT NOT NULL, city TEXT NOT NULL, user_agent TEXT NOT NULL, scope TEXT NOT NULL, uuid text NOT NULL)
