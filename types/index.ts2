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

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  changes?: ChangePreview[];
};

export type ChangePreview = {
  type: 'add' | 'edit' | 'delete';
  file: string;
  description: string;
};
