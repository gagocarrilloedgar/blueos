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

export type TaskStatus = (typeof taskStatus)[number];

export type Task = {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  assignees: {
    id: number;
    name: string;
  }[];
};
