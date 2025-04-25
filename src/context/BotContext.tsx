
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Bot, BotCreationData } from "../types/bot";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BotContextProps {
  bots: Bot[];
  createBot: (data: BotCreationData) => void;
  deleteBot: (id: string) => void;
  getBot: (id: string) => Bot | undefined;
  updateBot: (id: string, data: Partial<Bot>) => void;
}

const BotContext = createContext<BotContextProps | undefined>(undefined);

export const useBots = () => {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error("useBots must be used within a BotProvider");
  }
  return context;
};

interface BotProviderProps {
  children: ReactNode;
}

export const BotProvider = ({ children }: BotProviderProps) => {
  // Sample initial bot for demonstration
  const [bots, setBots] = useState<Bot[]>([
    {
      id: "demo-bot-1",
      name: "Assistente de Vendas",
      description: "Um bot para ajudar com vendas e atendimento ao cliente",
      personality: "Amigável",
      createdAt: new Date("2025-04-23"),
      isActive: true,
      stats: {
        messages: 245,
        users: 18
      },
      welcomeMessage: "Olá! Como posso ajudar com suas dúvidas sobre nossos produtos?",
      language: "pt-BR",
      responseTime: "Normal"
    }
  ]);

  const navigate = useNavigate();

  const createBot = (data: BotCreationData) => {
    const newBot: Bot = {
      id: `bot-${Date.now()}`,
      name: data.name,
      description: data.description,
      personality: data.personality || "Amigável",
      createdAt: new Date(),
      isActive: true,
      stats: {
        messages: 0,
        users: 0
      },
      welcomeMessage: data.welcomeMessage || `Olá! Sou o ${data.name}, como posso ajudar?`,
      language: data.language || "pt-BR",
      responseTime: data.responseTime || "Normal",
      avatar: data.avatar
    };

    setBots([...bots, newBot]);
    toast.success("Bot criado com sucesso!");
    navigate("/dashboard");
  };

  const deleteBot = (id: string) => {
    setBots(bots.filter(bot => bot.id !== id));
    toast.success("Bot excluído com sucesso!");
  };

  const getBot = (id: string) => {
    return bots.find(bot => bot.id === id);
  };

  const updateBot = (id: string, data: Partial<Bot>) => {
    const botIndex = bots.findIndex(bot => bot.id === id);
    if (botIndex !== -1) {
      const updatedBots = [...bots];
      updatedBots[botIndex] = { ...updatedBots[botIndex], ...data };
      setBots(updatedBots);
      toast.success("Bot atualizado com sucesso!");
    } else {
      toast.error("Bot não encontrado!");
    }
  };

  return (
    <BotContext.Provider value={{ bots, createBot, deleteBot, getBot, updateBot }}>
      {children}
    </BotContext.Provider>
  );
};
