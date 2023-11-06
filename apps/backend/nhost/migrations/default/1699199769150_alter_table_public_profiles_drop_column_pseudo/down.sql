alter table "public"."profiles" alter column "pseudo" drop not null;
alter table "public"."profiles" add column "pseudo" text;
