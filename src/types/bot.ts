
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
  knowledgeBase?: {
    files?: string[];
    conversations?: string[];
    websites?: string[];
  };
  integrationType?: "whatsapp" | "telegram" | "website";
  integrationStatus?: "connected" | "pending" | "disconnected";
  aiModel?: "gpt-3.5-turbo" | "gpt-4" | "claude-3" | "gemini-pro";
  tags?: string[];
}

export interface BotCreationData {
  name: string;
  description: string;
  personality: "Formal" | "Amigável" | "Divertido";
  knowledgeSource?: "files" | "conversation" | "websites";
  welcomeMessage?: string;
  language?: "pt-BR" | "en-US" | "es-ES";
  responseTime?: "Rápido" | "Normal" | "Detalhado";
  avatar?: string;
  aiModel?: "gpt-3.5-turbo" | "gpt-4" | "claude-3" | "gemini-pro";
  tags?: string[];
}

export interface Message {
  id: string;
  botId: string;
  userId: string;
  content: string;
  timestamp: Date;
  isUserMessage: boolean;
  status: "sent" | "delivered" | "read" | "failed";
}

export interface User {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
  lastInteraction?: Date;
  totalInteractions: number;
  botInteractions: {
    [botId: string]: {
      messageCount: number;
      lastInteraction: Date;
    };
  };
}

export interface BotAnalytics {
  botId: string;
  dailyStats: Array<{
    date: string;
    messageCount: number;
    userCount: number;
    responseTime: number;
  }>;
  topQuestions: Array<{
    question: string;
    count: number;
  }>;
  userSatisfaction: number;
  averageResponseTime: number;
}
