// ... existing code ...

import { relations, sql } from "drizzle-orm";
import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { clientsTable, organisationsTable, projectsTable } from "./main";

export const foldersTable = pgTable("folders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  parentId: integer("parent_id"),
  projectId: integer("project_id").references(() => projectsTable.id, {
    onDelete: "cascade"
  }),
  organisationId: integer("organisation_id")
    .references(() => organisationsTable.id, {
      onDelete: "cascade"
    })
    .notNull(),
  clientId: integer("client_id").references(() => clientsTable.id),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true
  })
});

export const foldersRelations = relations(foldersTable, ({ one, many }) => ({
  parent: one(foldersTable, {
    fields: [foldersTable.parentId],
    references: [foldersTable.id]
  }),
  project: one(projectsTable, {
    fields: [foldersTable.projectId],
    references: [projectsTable.id]
  }),
  organisation: one(organisationsTable, {
    fields: [foldersTable.organisationId],
    references: [organisationsTable.id]
  }),
  client: one(clientsTable, {
    fields: [foldersTable.clientId],
    references: [clientsTable.id]
  })
}));
