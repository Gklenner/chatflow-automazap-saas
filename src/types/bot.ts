
export interface Bot {
  id: string;
  name: string;
  description: string;
  personality: "Formal" | "Amigável" | "Divertido";
  createdAt: Date;
  isActive: boolean;
  stats: {
    messages: number;
    users: number;
  };
}

export interface BotCreationData {
  name: string;
  description: string;
  personality: "Formal" | "Amigável" | "Divertido";
  knowledgeSource?: "files" | "conversation";
}
