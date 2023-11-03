alter table "public"."games" alter column "nbPlayers" drop not null;
alter table "public"."games" add column "nbPlayers" int4;
