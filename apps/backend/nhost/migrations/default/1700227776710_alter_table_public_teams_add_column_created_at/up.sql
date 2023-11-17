alter table "public"."teams" add column "created_at" timestamptz
 null default now();
