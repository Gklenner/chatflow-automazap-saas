
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
  avatar?: string;
  welcomeMessage?: string;
  language?: "pt-BR" | "en-US" | "es-ES";
  responseTime?: "Rápido" | "Normal" | "Detalhado";
}

export interface BotCreationData {
  name: string;
  description: string;
  personality: "Formal" | "Amigável" | "Divertido";
  knowledgeSource?: "files" | "conversation";
  welcomeMessage?: string;
  language?: "pt-BR" | "en-US" | "es-ES";
  responseTime?: "Rápido" | "Normal" | "Detalhado";
  avatar?: string;
}
