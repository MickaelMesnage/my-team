alter table "public"."user_team" add constraint "user_team_userId_teamId_key" unique ("userId", "teamId");
