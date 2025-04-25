
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatBotProps {
  initialMessage?: string;
  botName?: string;
  onMessage?: (message: string) => void;
}

export const ChatBot = ({ 
  initialMessage = "Olá! Como posso ajudar você hoje?", 
  botName = "Assistente de Vendas",
  onMessage 
}: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial bot message on component mount
  useEffect(() => {
    if (initialMessage) {
      setMessages([
        {
          id: "initial",
          text: initialMessage,
          sender: "bot",
          timestamp: new Date()
        }
      ]);
    }
  }, [initialMessage]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sample bot responses based on keywords
  const getBotResponse = (userMessage: string): string => {
    const normalizedMessage = userMessage.toLowerCase();
    
    if (normalizedMessage.includes("preço") || normalizedMessage.includes("valor") || normalizedMessage.includes("custa")) {
      return "Nossos preços variam de acordo com o produto. Posso ajudar a encontrar um específico?";
    } else if (normalizedMessage.includes("entrega") || normalizedMessage.includes("prazo")) {
      return "Normalmente entregamos em 3-5 dias úteis, dependendo da sua localização.";
    } else if (normalizedMessage.includes("pagamento") || normalizedMessage.includes("pagar")) {
      return "Aceitamos pagamentos via cartão de crédito, PIX, boleto bancário e transferência.";
    } else if (normalizedMessage.includes("desconto") || normalizedMessage.includes("promoção")) {
      return "Temos promoções semanais! Posso verificar os descontos disponíveis para você agora.";
    } else if (normalizedMessage.includes("olá") || normalizedMessage.includes("oi") || normalizedMessage.includes("bom dia") || normalizedMessage.includes("boa tarde") || normalizedMessage.includes("boa noite")) {
      return `Olá! Como posso ajudar você hoje?`;
    } else {
      return "Entendi. Posso ajudar com mais alguma informação sobre nossos produtos ou serviços?";
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Notify parent component about new message (if handler provided)
    if (onMessage) {
      onMessage(input);
    }
    
    setInput("");

    // Simulate bot response after a small delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
              {message.sender === 'bot' && (
                <Avatar className="h-8 w-8 mr-2">
                  <div className="h-8 w-8 rounded-full bg-automazap-500 flex items-center justify-center text-white">
                    <span className="text-xs font-semibold">B</span>
                  </div>
                </Avatar>
              )}
              
              <div 
                className={`rounded-2xl py-2 px-4 ${
                  message.sender === 'user' 
                    ? 'bg-automazap-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-3 flex">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-automazap-300"
        />
        <Button 
          onClick={handleSendMessage} 
          className="rounded-l-none bg-automazap-500 hover:bg-automazap-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
