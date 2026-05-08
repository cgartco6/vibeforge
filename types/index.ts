export type Project = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  prompt_history: any[];
  code_snapshot?: string;
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  email: string;
};
