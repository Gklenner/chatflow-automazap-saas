
import { useParams, Link } from "react-router-dom";
import { useBots } from "@/context/BotContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, Calendar, MessageSquare, UserRound, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const BotUsers = () => {
  const { botId } = useParams();
  const { getBot, getBotUsers } = useBots();
  const [searchTerm, setSearchTerm] = useState("");
  
  const bot = botId ? getBot(botId) : undefined;
  const users = botId ? getBotUsers(botId) : [];
  
  if (!bot) {
    return (
      <div className="p-8">
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
        </Link>
        <div className="mt-4">Bot não encontrado</div>
      </div>
    );
  }
  
  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phoneNumber && user.phoneNumber.includes(searchTerm))
  );
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link to={`/bot/details/${botId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o bot
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{bot.name} - Usuários</h1>
        <p className="text-gray-600">Gerenciar usuários que interagiram com o bot</p>
      </div>
      
      {/* Search and filter */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar usuários por nome, email ou telefone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Users list */}
      <div className="space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-4">
                      <UserRound className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <div className="flex flex-col md:flex-row md:space-x-4 text-sm text-gray-500">
                        {user.email && (
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-1" />
                            <span>{user.email}</span>
                          </div>
                        )}
                        {user.phoneNumber && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-1" />
                            <span>{user.phoneNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        Última interação: {user.lastInteraction ? new Date(user.lastInteraction).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>
                        {user.botInteractions?.[botId]?.messageCount || 0} mensagens
                      </span>
                    </div>
                    
                    <Link to={`/bot/chat/${botId}/${user.id}`}>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>Ver conversas</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">Nenhum usuário encontrado</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BotUsers;
