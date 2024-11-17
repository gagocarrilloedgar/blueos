import { relations, sql } from "drizzle-orm";
import {
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

import { foldersTable } from "./folders";
import {
    accountsTable,
    clientsTable,
    organisationsTable,
    projectsTable
} from "./main";

export const taskStatus = [
  "To do",
  "In progress",
  "Blocked",
  "Review",
  "Waiting for input",
  "Done"
] as const;

export const taskPriority = [
  "None",
  "Low",
  "Medium",
  "High",
  "Urgent"
] as const;
export type TaskPriority = (typeof taskPriority)[number];
export const taskPriorityEnum = pgEnum("task_priority", taskPriority);

export type TaskStatus = (typeof taskStatus)[number];
export const taskStatusEnum = pgEnum("task_status", taskStatus);

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  priority: taskPriorityEnum("priority").default("None"),
  requestId: integer("request_id").references(() => requestsTable.id),
  description: text(),
  createdBy: integer("created_by").references(() => accountsTable.id),
  status: taskStatusEnum("status").default("To do"),
  projectId: integer("project_id").references(() => projectsTable.id),
  completedBy: integer("completed_by").references(() => accountsTable.id),
  folderId: integer("folder_id").references(() => foldersTable.id),
  organisationId: integer("organisation_id").references(
    () => organisationsTable.id
  ),
  clientId: integer("client_id").references(() => clientsTable.id),
  dueDate: timestamp("due_date", {
    precision: 6,
    withTimezone: true
  }),
  completedAt: timestamp("completed_at", {
    precision: 6,
    withTimezone: true
  }),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true
  })
});

export const tasksRelations = relations(tasksTable, ({ one, many }) => ({
  assignees: many(taskAssigneesTable),
  request: one(requestsTable, {
    fields: [tasksTable.requestId],
    references: [requestsTable.id]
  }),
  completedBy: one(accountsTable, {
    fields: [tasksTable.completedBy],
    references: [accountsTable.id]
  }),
  client: one(clientsTable, {
    fields: [tasksTable.clientId],
    references: [clientsTable.id]
  }),
  organisation: one(organisationsTable, {
    fields: [tasksTable.organisationId],
    references: [organisationsTable.id]
  }),
  project: one(projectsTable, {
    fields: [tasksTable.projectId],
    references: [projectsTable.id]
  }),
  folder: one(foldersTable, {
    fields: [tasksTable.folderId],
    references: [foldersTable.id]
  }),
  author: one(accountsTable, {
    fields: [tasksTable.createdBy],
    references: [accountsTable.id]
  })
}));

export const taskAssigneesTable = pgTable("task_assignees", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  taskId: integer("task_id").references(() => tasksTable.id),
  accountId: integer("account_id").references(() => accountsTable.id)
});

export const taskAssigneesRelations = relations(
  taskAssigneesTable,
  ({ one }) => ({
    task: one(tasksTable, {
      fields: [taskAssigneesTable.taskId],
      references: [tasksTable.id]
    })
  })
);

export const requestStatus = [
  "Pending",
  "To review",
  "Completed",
  "Declined"
] as const;

export type RequestStatus = (typeof requestStatus)[number];
export const requestStatusEnum = pgEnum("request_status", requestStatus);

export const requestsTable = pgTable("requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  requesterId: integer("requester_id").references(() => accountsTable.id),
  requesterEmail: varchar("requester_email", { length: 255 }),
  status: requestStatusEnum("status").default("Pending"),
  organisationId: integer("organisation_id")
    .references(() => organisationsTable.id)
    .notNull(),
  clientId: integer("client_id").references(() => clientsTable.id),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true
  }).default(sql`now()`)
});

export const requestsRelations = relations(requestsTable, ({ one, many }) => ({
  organisation: one(organisationsTable, {
    fields: [requestsTable.organisationId],
    references: [organisationsTable.id]
  }),
  tasks: many(tasksTable),
  client: one(clientsTable, {
    fields: [requestsTable.clientId],
    references: [clientsTable.id]
  }),
  requester: one(accountsTable, {
    fields: [requestsTable.requesterId],
    references: [accountsTable.id]
  })
}));
