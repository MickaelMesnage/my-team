alter table "public"."games"
  add constraint "games_status_fkey"
  foreign key ("status")
  references "public"."game_status"
  ("value") on update restrict on delete restrict;
