import * as dotenv from "dotenv";
dotenv.config();

const {
  NHOST_SUBDOMAIN,
  NHOST_GRAPHQL_URL,
  NHOST_WEBHOOK_SECRET,
  NHOST_ADMIN_SECRET,
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE,
} = process.env;

if (!NHOST_SUBDOMAIN)
  throw new Error("Nhost: No NHOST_BACKEND_URL env var set");

// const NHOST_ADMIN_SECRET = process.env.NHOST_ADMIN_SECRET;
if (!NHOST_ADMIN_SECRET)
  throw new Error("Nhost: No NHOST_BACKEND_URL env var set");

// const NHOST_GRAPHQL_URL = process.env.NHOST_GRAPHQL_URL;
if (!NHOST_GRAPHQL_URL)
  throw new Error("Settings: No NHOST_GRAPHQL_URL env var set");

if (!NHOST_WEBHOOK_SECRET)
  throw new Error("Settings: No NHOST_WEBHOOK_SECRET env var set");

if (!MJ_APIKEY_PRIVATE)
  throw new Error("Settings: No MJ_APIKEY_PRIVATE env var set");

if (!MJ_APIKEY_PUBLIC)
  throw new Error("Settings: No MJ_APIKEY_PUBLIC env var set");

export default {
  security: {
    nhost_webhook_secret: NHOST_WEBHOOK_SECRET,
    nhost_admin_secret: NHOST_ADMIN_SECRET,
  },
  nhost_subdomain: NHOST_SUBDOMAIN,
  nhost_graphql_url: NHOST_GRAPHQL_URL,
  nhost_metadata_url: `${NHOST_SUBDOMAIN}/v1/metadata`,
  mj_apikey_private: MJ_APIKEY_PRIVATE,
  mj_apikey_public: MJ_APIKEY_PUBLIC,
};
