
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Bot, BotCreationData } from "../types/bot";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BotContextProps {
  bots: Bot[];
  createBot: (data: BotCreationData) => void;
  deleteBot: (id: string) => void;
  getBot: (id: string) => Bot | undefined;
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
      }
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
      }
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

  return (
    <BotContext.Provider value={{ bots, createBot, deleteBot, getBot }}>
      {children}
    </BotContext.Provider>
  );
};
