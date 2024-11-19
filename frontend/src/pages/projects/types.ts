export interface Folders {
  id: number;
  name: string;
}

export interface ProjectDetail {
  id: number;
  name: string;
  description: string;
  workedHours: number;
  createdAt: string;
  avatar?: string;
  client: {
    id: number;
    name: string;
  };
}
