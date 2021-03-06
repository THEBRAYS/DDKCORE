/* Add Broadhash Column to Peers
 *
 */

BEGIN;

ALTER TABLE "peers"
  ADD COLUMN "broadhash" BYTEA;

CREATE INDEX IF NOT EXISTS "peers_broadhash"
  ON "peers" ("broadhash");

COMMIT;
