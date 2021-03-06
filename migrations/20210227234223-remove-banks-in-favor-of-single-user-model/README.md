# Migration `20210227234223-remove-banks-in-favor-of-single-user-model`

This migration has been generated by Julian LaNeve at 2/27/2021, 5:42:23 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "Bank.email_unique"

DROP INDEX "Bank.name_unique"

PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinancingAgreement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL,
    "rate" REAL NOT NULL,
    "bankId" INTEGER NOT NULL,

    FOREIGN KEY ("bankId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FinancingAgreement" ("id", "filled", "amount", "rate", "bankId") SELECT "id", "filled", "amount", "rate", "bankId" FROM "FinancingAgreement";
DROP TABLE "FinancingAgreement";
ALTER TABLE "new_FinancingAgreement" RENAME TO "FinancingAgreement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON

PRAGMA foreign_keys=off;
DROP TABLE "Bank";
PRAGMA foreign_keys=on
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210227234055-add-agreements..20210227234223-remove-banks-in-favor-of-single-user-model
--- datamodel.dml
+++ datamodel.dml
@@ -1,8 +1,8 @@
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -19,17 +19,8 @@
     products          Product[]
 }
-model Bank {
-    id                Int       @id @default(autoincrement())
-    name              String    @unique
-    email             String    @unique
-    password          String
-
-    agreements        FinancingAgreement[]
-}
-
 model Product {
     id                Int       @id @default(autoincrement())
     type              String
     name              String    @default("")
@@ -52,8 +43,8 @@
     rate              Float
     products          Product[]
-    bank              Bank        @relation(fields: [bankId], references: [id])
+    bank              User        @relation(fields: [bankId], references: [id])
     bankId            Int
 }
```


