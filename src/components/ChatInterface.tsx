
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Olá! Como posso ajudar você hoje?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Entendi! Como posso ajudar com isso?",
        "Obrigado por compartilhar essa informação.",
        "Vou salvar isso em minha base de conhecimento!",
        "Você poderia me dar mais detalhes sobre isso?",
        "Essa informação é muito útil para mim."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden bg-white">
      {/* Chat header */}
      <div className="bg-automazap-600 text-white p-4">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-automazap-600 mr-3">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Treinamento do Bot</h3>
            <p className="text-sm text-white/80">Converse com seu bot para treiná-lo</p>
          </div>
        </div>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex",
              message.isBot ? "justify-start" : "justify-end"
            )}
          >
            <div 
              className={cn(
                "max-w-[80%] rounded-lg p-3",
                message.isBot 
                  ? "bg-white border border-gray-200 text-gray-800" 
                  : "bg-automazap-600 text-white"
              )}
            >
              <p>{message.content}</p>
              <div 
                className={cn(
                  "text-xs mt-1",
                  message.isBot ? "text-gray-500" : "text-white/80"
                )}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage} 
            className="gradient-bg"
            disabled={!input.trim()}
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
