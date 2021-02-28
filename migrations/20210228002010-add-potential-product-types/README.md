# Migration `20210228002010-add-potential-product-types`

This migration has been generated by Julian LaNeve at 2/27/2021, 6:20:10 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FinancingAgreement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL,
    "rate" REAL NOT NULL,
    "potentialProducts" TEXT NOT NULL,
    "potentialQualities" TEXT NOT NULL,
    "bankId" INTEGER NOT NULL,

    FOREIGN KEY ("bankId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FinancingAgreement" ("id", "filled", "amount", "rate", "bankId") SELECT "id", "filled", "amount", "rate", "bankId" FROM "FinancingAgreement";
DROP TABLE "FinancingAgreement";
ALTER TABLE "new_FinancingAgreement" RENAME TO "FinancingAgreement";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210227234223-remove-banks-in-favor-of-single-user-model..20210228002010-add-potential-product-types
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
@@ -41,8 +41,14 @@
     amount            Float
     rate              Float
+    // Before order is filled
+    potentialProducts String
+    potentialQualities String
+
+
+    // Only available after order is filled
     products          Product[]
     bank              User        @relation(fields: [bankId], references: [id])
     bankId            Int
```

