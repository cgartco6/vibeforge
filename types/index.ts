export type Project = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  prompt_history: ChatMessage[];
  code_snapshot?: string;
  created_at: string;
  updated_at: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  changes?: ChangePreview[];
};

export type ChangePreview = {
  type: 'add' | 'edit' | 'delete' | 'refactor';
  file: string;
  description: string;
  codeSnippet?: string;
};
