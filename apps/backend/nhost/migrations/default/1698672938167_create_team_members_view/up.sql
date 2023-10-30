CREATE OR REPLACE VIEW "public"."team_members" AS 
 SELECT users.id,
    users.display_name,
    users.avatar_url,
    users.phone_number,
    users.email,
    users.metadata
   FROM auth.users;
