
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, MessageSquare, Bot, Settings, Users, BarChart, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useBots } from "@/context/BotContext";

const Dashboard = () => {
  const [botName, setBotName] = useState("");
  const navigate = useNavigate();
  const { bots, deleteBot } = useBots();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container px-4 py-4 mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-poppins font-bold text-xl">
              Automa<span className="text-automazap-600">Zap</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Users className="h-5 w-5 mr-1" />
              <span>Suporte</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Settings className="h-5 w-5 mr-1" />
              <span>Configurações</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-automazap-100 text-automazap-600 flex items-center justify-center font-semibold">
              U
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col lg:flex-row justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Painel de Controle</h1>
            <p className="text-gray-600">Gerencie seus bots e visualize estatísticas</p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Button className="gradient-bg" onClick={() => navigate('/bot/create')}>
              <Plus className="h-5 w-5 mr-1" />
              <span>Criar Novo Bot</span>
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="bots" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 mb-4">
            <TabsTrigger value="bots">Meus Bots</TabsTrigger>
            <TabsTrigger value="stats">Estatísticas</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
          </TabsList>

          {/* Bots Tab */}
          <TabsContent value="bots" className="space-y-6">
            {/* Show Create Bot Card only if there are no bots */}
            {bots.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300 bg-white">
                <CardHeader>
                  <CardTitle>Crie seu primeiro bot</CardTitle>
                  <CardDescription>Configure um novo chatbot para WhatsApp em poucos minutos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="botName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do bot
                      </label>
                      <Input
                        id="botName"
                        placeholder="Ex: Atendente Virtual"
                        value={botName}
                        onChange={(e) => setBotName(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full gradient-bg" onClick={() => navigate('/bot/create')}>
                    <Bot className="h-5 w-5 mr-1" />
                    <span>Criar Bot</span>
                  </Button>
                </CardFooter>
              </Card>
            ) : null}

            {/* List of bots */}
            {bots.map((bot) => (
              <Card key={bot.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-automazap-500 flex items-center justify-center text-white mr-3">
                        <Bot className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{bot.name}</CardTitle>
                        <CardDescription>
                          Criado em {bot.createdAt.toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Ativo
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex space-x-4">
                      <div>
                        <span className="text-gray-500">Mensagens:</span>
                        <span className="ml-1 font-semibold">{bot.stats.messages}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Usuários:</span>
                        <span className="ml-1 font-semibold">{bot.stats.users}</span>
                      </div>
                    </div>
                    <div className="text-automazap-600">
                      +12% na última semana
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => navigate('/bot/details')}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span>Detalhes</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigate('/bot/training')}>
                      <Settings className="h-4 w-4 mr-1" />
                      <span>Treinar</span>
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50" onClick={() => deleteBot(bot.id)}>
                    <Trash className="h-4 w-4 mr-1" />
                    <span>Excluir</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
                <CardDescription>Visualize o desempenho dos seus bots</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border border-dashed border-gray-300 rounded-md">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Os gráficos estarão disponíveis quando você tiver pelo menos um bot ativo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>Conecte seu WhatsApp para começar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-green-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">WhatsApp</h3>
                        <p className="text-sm text-gray-500">Conecte sua conta para enviar e receber mensagens</p>
                      </div>
                    </div>
                    <Button className="gradient-bg">
                      Conectar
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 flex justify-between items-center opacity-60">
                    <div className="flex items-center">
                      <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.886 9.4c.165.765.206 1.56.123 2.34a9.798 9.798 0 01-3.033 6.068 9.799 9.799 0 01-6.207 2.716 9.788 9.788 0 01-6.698-1.49A9.788 9.788 0 014.2 12.992a9.788 9.788 0 011.633-6.683A9.798 9.798 0 0112.02 3.14a10.548 10.548 0 014.454.961c.128.059.246.131.35.22l-4.678 4.678-.006-2.181a1.408 1.408 0 10-2.814 0l.006 4.605.001.211c0 .373.149.732.414.996s.623.413.996.413h4.605a1.408 1.408 0 000-2.814l-2.211.006 4.723-4.723c.807.604 1.509 1.35 2.074 2.204a10.598 10.598 0 011.754 3.484h2.066a12.707 12.707 0 00-3.877-6.356 12.721 12.721 0 00-13.865-2.73 12.722 12.722 0 00-6.258 6.257 12.722 12.722 0 002.73 13.866 12.721 12.721 0 007.998 3.721 12.721 12.721 0 008.597-2.201 12.721 12.721 0 004.77-7.574 12.707 12.707 0 00-.16-6.284h-2.066z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold">CRM</h3>
                        <p className="text-sm text-gray-500">Sincronize contatos e conversas (em breve)</p>
                      </div>
                    </div>
                    <Button disabled>
                      Em Breve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
