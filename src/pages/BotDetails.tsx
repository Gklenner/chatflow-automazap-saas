
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bot, MessageSquare, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";

const BotDetails = () => {
  const navigate = useNavigate();
  const [botName] = useState("Assistente de Vendas");
  
  // Mock data for statistics
  const stats = {
    totalMessages: 245,
    activeUsers: 18,
    responseRate: 96,
    avgResponseTime: "30s",
    successRate: 89
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              className="mr-4"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Voltar</span>
            </Button>
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-poppins font-bold text-xl">
              Automa<span className="text-automazap-600">Zap</span>
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-automazap-500 flex items-center justify-center text-white mr-3">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{botName}</h1>
            <p className="text-gray-600">Estatísticas e Desempenho</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total de Mensagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalMessages}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Usuários Ativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeUsers}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taxa de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.responseRate}%</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Tempo Médio de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avgResponseTime}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taxa de Sucesso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.successRate}%</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Conversations */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Conversas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start p-3 hover:bg-gray-50 rounded-md">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">Cliente #{item}</h3>
                          <span className="text-xs text-gray-500">Hoje, 14:3{item}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item === 1 ? "Olá, gostaria de saber mais sobre o produto X." : 
                           item === 2 ? "Qual o prazo de entrega para o CEP 12345-678?" : 
                           "Vocês aceitam pagamento via PIX?"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Chart placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de desempenho do bot</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Chat Test Interface */}
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Testar Conversa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotDetails;
