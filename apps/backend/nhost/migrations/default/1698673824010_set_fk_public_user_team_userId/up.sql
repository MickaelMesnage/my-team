alter table "public"."user_team"
  add constraint "user_team_userId_fkey2"
  foreign key ("userId")
  references "auth"."users"
  ("id") on update cascade on delete cascade;
