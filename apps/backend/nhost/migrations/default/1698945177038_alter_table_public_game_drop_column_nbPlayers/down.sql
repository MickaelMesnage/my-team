alter table "public"."game" alter column "nbPlayers" drop not null;
alter table "public"."game" add column "nbPlayers" int4;
