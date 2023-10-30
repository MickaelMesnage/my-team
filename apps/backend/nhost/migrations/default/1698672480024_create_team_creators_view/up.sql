CREATE VIEW public.team_creators AS
  SELECT id, display_name, avatar_url, phone_number, email, metadata
    FROM auth.users;
