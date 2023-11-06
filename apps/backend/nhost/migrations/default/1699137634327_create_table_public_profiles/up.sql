CREATE TABLE "public"."profiles" ("user_id" uuid NOT NULL, "pseudo" text NOT NULL, "avatar" text, PRIMARY KEY ("user_id") , FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("user_id"));