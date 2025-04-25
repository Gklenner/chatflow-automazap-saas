
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBots } from "@/context/BotContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Bot, MessageSquare, Send, User } from "lucide-react";
import { Message } from "@/types/bot";

const ChatInterface = () => {
  const { botId, userId: urlUserId } = useParams();
  const { getBot, getMessages, sendMessage, users } = useBots();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(urlUserId || `user-${Date.now()}`);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const bot = botId ? getBot(botId) : undefined;
  
  useEffect(() => {
    if (botId) {
      const messages = getMessages(botId, userId);
      setChatMessages(messages);
      
      // If no messages and bot has welcome message, add it
      if (messages.length === 0 && bot?.welcomeMessage) {
        sendMessage(botId, "start_conversation", userId);
      }
    }
  }, [botId, userId, getMessages, bot, sendMessage]);
  
  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!botId || !message.trim()) return;
    
    await sendMessage(botId, message, userId);
    setMessage("");
    
    // Refresh messages
    setChatMessages(getMessages(botId, userId));
  };

  if (!bot) {
    return <div className="p-8">Bot não encontrado</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        <div className="h-10 w-10 rounded-full bg-automazap-500 flex items-center justify-center text-white mr-3 overflow-hidden">
          {bot.avatar ? (
            <img src={bot.avatar} alt={bot.name} className="h-full w-full object-cover" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
        </div>
        <div>
          <h1 className="font-semibold">{bot.name}</h1>
          <p className="text-sm text-gray-500">{bot.isActive ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.isUserMessage ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 ${
                msg.isUserMessage 
                  ? 'bg-automazap-600 text-white' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.isUserMessage ? 'text-automazap-100' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button type="submit" className="gradient-bg">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
