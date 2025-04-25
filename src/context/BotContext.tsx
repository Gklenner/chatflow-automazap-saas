
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Bot, BotCreationData, Message, User, BotAnalytics } from "../types/bot";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface BotContextProps {
  bots: Bot[];
  createBot: (data: BotCreationData) => void;
  deleteBot: (id: string) => void;
  getBot: (id: string) => Bot | undefined;
  updateBot: (id: string, data: Partial<Bot>) => void;
  toggleBotStatus: (id: string) => void;
  messages: Message[];
  sendMessage: (botId: string, content: string, userId: string) => Promise<void>;
  getMessages: (botId: string, userId?: string) => Message[];
  users: User[];
  getUser: (userId: string) => User | undefined;
  getBotUsers: (botId: string) => User[];
  analytics: Record<string, BotAnalytics>;
  getBotAnalytics: (botId: string) => BotAnalytics | undefined;
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
      responseTime: "Normal",
      aiModel: "gpt-3.5-turbo",
      tags: ["vendas", "atendimento"]
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      botId: "demo-bot-1",
      userId: "user-1",
      content: "Olá! Como posso ajudar com suas dúvidas sobre nossos produtos?",
      timestamp: new Date("2025-04-23T10:30:00"),
      isUserMessage: false,
      status: "delivered"
    },
    {
      id: "msg-2",
      botId: "demo-bot-1",
      userId: "user-1",
      content: "Olá, gostaria de saber mais sobre o plano Premium",
      timestamp: new Date("2025-04-23T10:31:00"),
      isUserMessage: true,
      status: "read"
    },
    {
      id: "msg-3",
      botId: "demo-bot-1",
      userId: "user-1",
      content: "O plano Premium oferece acesso ilimitado a todas as funcionalidades, suporte prioritário e relatórios avançados por R$99/mês. Posso enviar mais detalhes?",
      timestamp: new Date("2025-04-23T10:32:00"),
      isUserMessage: false,
      status: "read"
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: "user-1",
      name: "João Silva",
      phoneNumber: "+5511999999999",
      email: "joao@exemplo.com",
      lastInteraction: new Date("2025-04-23T10:32:00"),
      totalInteractions: 3,
      botInteractions: {
        "demo-bot-1": {
          messageCount: 3,
          lastInteraction: new Date("2025-04-23T10:32:00")
        }
      }
    }
  ]);

  const [analytics, setAnalytics] = useState<Record<string, BotAnalytics>>({
    "demo-bot-1": {
      botId: "demo-bot-1",
      dailyStats: [
        {
          date: "2025-04-23",
          messageCount: 12,
          userCount: 3,
          responseTime: 1.5
        },
        {
          date: "2025-04-24",
          messageCount: 18,
          userCount: 5,
          responseTime: 1.2
        },
      ],
      topQuestions: [
        {
          question: "Qual o preço do plano Premium?",
          count: 8
        },
        {
          question: "Como funciona o período de teste?",
          count: 5
        }
      ],
      userSatisfaction: 4.7,
      averageResponseTime: 1.3
    }
  });

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
      avatar: data.avatar,
      aiModel: data.aiModel || "gpt-3.5-turbo",
      tags: data.tags || []
    };

    setBots([...bots, newBot]);
    
    // Create initial analytics for the new bot
    setAnalytics({
      ...analytics,
      [newBot.id]: {
        botId: newBot.id,
        dailyStats: [{
          date: new Date().toISOString().split('T')[0],
          messageCount: 0,
          userCount: 0,
          responseTime: 0
        }],
        topQuestions: [],
        userSatisfaction: 0,
        averageResponseTime: 0
      }
    });
    
    toast.success("Bot criado com sucesso!");
    navigate("/dashboard");
  };

  const deleteBot = (id: string) => {
    setBots(bots.filter(bot => bot.id !== id));
    
    // Clean up messages for the deleted bot
    setMessages(messages.filter(message => message.botId !== id));
    
    // Clean up analytics for the deleted bot
    const newAnalytics = { ...analytics };
    delete newAnalytics[id];
    setAnalytics(newAnalytics);
    
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
  
  const toggleBotStatus = (id: string) => {
    const botIndex = bots.findIndex(bot => bot.id === id);
    if (botIndex !== -1) {
      const updatedBots = [...bots];
      updatedBots[botIndex] = { 
        ...updatedBots[botIndex], 
        isActive: !updatedBots[botIndex].isActive 
      };
      setBots(updatedBots);
      toast.success(`Bot ${updatedBots[botIndex].isActive ? "ativado" : "desativado"} com sucesso!`);
    } else {
      toast.error("Bot não encontrado!");
    }
  };
  
  // Simulate AI response generation
  const generateAIResponse = async (botId: string, userMessage: string): Promise<string> => {
    const bot = getBot(botId);
    if (!bot) return "Desculpe, ocorreu um erro ao processar sua mensagem.";
    
    // Simulate response based on personality and response time
    await new Promise(resolve => {
      const delay = bot.responseTime === "Rápido" ? 500 : 
                   bot.responseTime === "Normal" ? 1500 : 3000;
      setTimeout(resolve, delay);
    });
    
    const responses = {
      "Formal": [
        "Agradeço pelo seu contato. Com base na sua solicitação, posso informar que...",
        "Conforme solicitado, gostaria de esclarecer que nossos produtos...",
        "Em resposta à sua pergunta, é importante destacar que...",
      ],
      "Amigável": [
        "Oi! Claro, posso te ajudar com isso! Sobre o que você perguntou...",
        "Olá! Que bom receber sua mensagem. Vamos lá, sobre isso...",
        "Entendi sua dúvida! Veja bem, o que acontece é que...",
      ],
      "Divertido": [
        "Eita, essa é boa! Deixa eu te contar o que sei sobre isso...",
        "Uau! Pergunta interessante! Vamos desvendar esse mistério...",
        "Haha, adoro quando perguntam isso! Então, a história é a seguinte...",
      ]
    };
    
    const personalityResponses = responses[bot.personality];
    const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    return randomResponse + " [Resposta simulada para: " + userMessage + "]";
  };

  const sendMessage = async (botId: string, content: string, userId: string) => {
    // Check if user exists
    let user = users.find(user => user.id === userId);
    
    // Create new user if doesn't exist
    if (!user) {
      user = {
        id: userId,
        name: `Usuário ${userId.split('-')[1]}`,
        lastInteraction: new Date(),
        totalInteractions: 0,
        botInteractions: {}
      };
      setUsers([...users, user]);
    }
    
    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-1`,
      botId,
      userId,
      content,
      timestamp: new Date(),
      isUserMessage: true,
      status: "sent"
    };
    
    setMessages([...messages, userMessage]);
    
    // Update user stats
    const updatedUsers = [...users];
    const userIndex = updatedUsers.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        lastInteraction: new Date(),
        totalInteractions: (updatedUsers[userIndex].totalInteractions || 0) + 1,
        botInteractions: {
          ...updatedUsers[userIndex].botInteractions,
          [botId]: {
            messageCount: (updatedUsers[userIndex].botInteractions?.[botId]?.messageCount || 0) + 1,
            lastInteraction: new Date()
          }
        }
      };
      setUsers(updatedUsers);
    }
    
    // Update bot stats
    const updatedBots = [...bots];
    const botIndex = updatedBots.findIndex(b => b.id === botId);
    
    if (botIndex !== -1) {
      updatedBots[botIndex] = {
        ...updatedBots[botIndex],
        stats: {
          ...updatedBots[botIndex].stats,
          messages: updatedBots[botIndex].stats.messages + 1,
        }
      };
      setBots(updatedBots);
    }
    
    // Update analytics
    const today = new Date().toISOString().split('T')[0];
    const botAnalytics = analytics[botId] || {
      botId,
      dailyStats: [],
      topQuestions: [],
      userSatisfaction: 0,
      averageResponseTime: 0
    };
    
    const todayStatsIndex = botAnalytics.dailyStats.findIndex(stat => stat.date === today);
    let updatedDailyStats = [...botAnalytics.dailyStats];
    
    if (todayStatsIndex !== -1) {
      updatedDailyStats[todayStatsIndex] = {
        ...updatedDailyStats[todayStatsIndex],
        messageCount: updatedDailyStats[todayStatsIndex].messageCount + 1
      };
    } else {
      updatedDailyStats.push({
        date: today,
        messageCount: 1,
        userCount: 1,
        responseTime: 0
      });
    }
    
    setAnalytics({
      ...analytics,
      [botId]: {
        ...botAnalytics,
        dailyStats: updatedDailyStats
      }
    });
    
    // Generate AI response
    try {
      const aiResponse = await generateAIResponse(botId, content);
      
      // Add bot response message
      const botResponseMessage: Message = {
        id: `msg-${Date.now()}-2`,
        botId,
        userId,
        content: aiResponse,
        timestamp: new Date(),
        isUserMessage: false,
        status: "sent"
      };
      
      setMessages(prevMessages => [...prevMessages, botResponseMessage]);
      
      // Update bot message stats
      const updatedBotsAfterResponse = [...bots];
      const botIndexAfterResponse = updatedBotsAfterResponse.findIndex(b => b.id === botId);
      
      if (botIndexAfterResponse !== -1) {
        updatedBotsAfterResponse[botIndexAfterResponse] = {
          ...updatedBotsAfterResponse[botIndexAfterResponse],
          stats: {
            ...updatedBotsAfterResponse[botIndexAfterResponse].stats,
            messages: updatedBotsAfterResponse[botIndexAfterResponse].stats.messages + 1,
          }
        };
        setBots(updatedBotsAfterResponse);
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast.error("Erro ao gerar resposta do bot");
    }
  };

  const getMessages = (botId: string, userId?: string) => {
    return messages.filter(message => {
      if (userId) {
        return message.botId === botId && message.userId === userId;
      }
      return message.botId === botId;
    }).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };
  
  const getUser = (userId: string) => {
    return users.find(user => user.id === userId);
  };
  
  const getBotUsers = (botId: string) => {
    return users.filter(user => 
      user.botInteractions && botId in user.botInteractions
    );
  };
  
  const getBotAnalytics = (botId: string) => {
    return analytics[botId];
  };

  return (
    <BotContext.Provider value={{ 
      bots, 
      createBot, 
      deleteBot, 
      getBot, 
      updateBot, 
      toggleBotStatus,
      messages,
      sendMessage,
      getMessages,
      users,
      getUser,
      getBotUsers,
      analytics,
      getBotAnalytics
    }}>
      {children}
    </BotContext.Provider>
  );
};
