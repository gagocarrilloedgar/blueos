export interface Account {
  id: number;
  name: string;
  email: string;
  userId: string | null;
  createdAt: string;
  isAdmin: boolean;
}
