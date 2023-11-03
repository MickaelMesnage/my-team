CREATE TABLE "public"."user_game" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "gameId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("id"), UNIQUE ("userId", "gameId"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_user_game_updated_at"
BEFORE UPDATE ON "public"."user_game"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_game_updated_at" ON "public"."user_game"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
