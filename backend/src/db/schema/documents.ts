import { relations, sql } from "drizzle-orm";
import {
    integer,
    pgTable,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";
import { foldersTable } from "./folders";
import { clientsTable, organisationsTable, projectsTable } from "./main";

export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  content: varchar(),
  folderId: integer("folder_id").references(() => foldersTable.id, {
    onDelete: "cascade"
  }),
  projectId: integer("project_id").references(() => projectsTable.id, {
    onDelete: "cascade"
  }),
  clientId: integer("client_id").references(() => clientsTable.id, {
    onDelete: "cascade"
  }),
  organisationId: integer("organisation_id").references(
    () => organisationsTable.id,
    {
      onDelete: "cascade"
    }
  ),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true
  })
});

export const documntsRelations = relations(documentsTable, ({ one, many }) => ({
  folder: one(foldersTable, {
    fields: [documentsTable.folderId],
    references: [foldersTable.id]
  }),
  project: one(projectsTable, {
    fields: [documentsTable.projectId],
    references: [projectsTable.id]
  }),
  client: one(clientsTable, {
    fields: [documentsTable.clientId],
    references: [clientsTable.id]
  }),
  organisation: one(organisationsTable, {
    fields: [documentsTable.organisationId],
    references: [organisationsTable.id]
  })
}));
