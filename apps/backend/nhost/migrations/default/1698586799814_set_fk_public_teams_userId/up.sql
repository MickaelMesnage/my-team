alter table "public"."teams"
  add constraint "teams_userId_fkey"
  foreign key ("userId")
  references "auth"."users"
  ("id") on update cascade on delete cascade;
