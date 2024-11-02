import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  real,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const ownerTypeEnum = pgEnum("owner", ["organisation", "portal"]);

export const accountsTable = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export const organisationsTable = pgTable("organisations", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  membershipType: varchar("membership_type", { length: 256 }).default(
    "organisation"
  ),
  size: integer("size").default(1),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export const organisationsRelations = relations(
  organisationsTable,
  ({ many }) => ({
    memberships: many(membershipsTable)
  })
);

export const portalsTable = pgTable("portals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  membershipType: varchar("membership_type", { length: 256 }).default("portal"),
  organisationId: integer("organisation_id").references(
    () => organisationsTable.id
  ),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export const portalsRelations = relations(portalsTable, ({ many }) => ({
  memberships: many(membershipsTable)
}));

export const clientsTable = pgTable("clients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  organisationId: integer("organisation_id").references(
    () => organisationsTable.id
  ),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export type OwnerType = (typeof ownerTypeEnum)["enumValues"][number];

export const membershipsTable = pgTable("memberships", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ownerId: integer("owner_id").notNull(),
  ownerType: ownerTypeEnum("owner_type").default("organisation"),
  accountId: integer("account_id").references(() => accountsTable.id),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export const membershipsRelations = relations(membershipsTable, ({ one }) => ({
  organisation: one(organisationsTable, {
    fields: [membershipsTable.ownerId, membershipsTable.ownerType],
    references: [organisationsTable.id, organisationsTable.membershipType]
  }),
  portal: one(portalsTable, {
    fields: [membershipsTable.ownerId, membershipsTable.ownerType],
    references: [portalsTable.id, portalsTable.membershipType]
  }),
  account: one(accountsTable, {
    fields: [membershipsTable.accountId],
    references: [accountsTable.id]
  })
}));

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  organisationId: integer().references(() => organisationsTable.id),
  clientId: integer().references(() => clientsTable.id),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  workedHours: real("worked_hours"),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true
  })
});

export const projectsRelations = relations(projectsTable, ({ one }) => ({
  client: one(clientsTable, {
    fields: [projectsTable.clientId],
    references: [clientsTable.id]
  }),
  organisation: one(organisationsTable, {
    fields: [projectsTable.organisationId],
    references: [organisationsTable.id]
  })
}));
