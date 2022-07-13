-- Adminer 4.8.1 PostgreSQL 14.4 (Debian 14.4-1.pgdg110+1) dump

DROP TABLE IF EXISTS "_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" character varying(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz DEFAULT now() NOT NULL,
    "applied_steps_count" integer DEFAULT '0' NOT NULL,
    CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

TRUNCATE "_prisma_migrations";
INSERT INTO "_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('93df7901-41ac-40f8-92af-e8d956c230d4',	'2e6d510ab99b9302773e4f50cdb23654eec65c88039cb303b979dbd5268d5691',	'2022-07-13 16:46:37.807434+09',	'20220713074637_init',	NULL,	NULL,	'2022-07-13 16:46:37.798288+09',	1),
('46a03e17-71b0-4cf4-89d0-a21cfb867caa',	'2e00b73d50174d57f7dbc492d8a10928f9794caf2241d49071d01b97f008ca9f',	'2022-07-13 17:29:39.15807+09',	'20220713082938_init',	NULL,	NULL,	'2022-07-13 17:29:39.153994+09',	1);

DROP TABLE IF EXISTS "articles";
DROP SEQUENCE IF EXISTS articles_id_seq;
CREATE SEQUENCE articles_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."articles" (
    "id" integer DEFAULT nextval('articles_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "body" character varying(255) NOT NULL,
    "created_at" timestamp(6) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "name" character varying(30) NOT NULL,
    "password" character varying(255) NOT NULL,
    CONSTRAINT "users_name_key" UNIQUE ("name"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."articles" ADD CONSTRAINT "articles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) NOT DEFERRABLE;

-- 2022-07-13 17:30:09.491951+09
