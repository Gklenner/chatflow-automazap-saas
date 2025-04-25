
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, LogOut, MessageSquare, Plus, Settings, User } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const bots = [
    {
      id: 1,
      name: "Atendimento Geral",
      description: "Bot para responder perguntas frequentes e direcionar clientes.",
      status: "online",
      messages: 45,
    },
    {
      id: 2,
      name: "Vendas",
      description: "Bot especializado em converter leads e apresentar produtos.",
      status: "offline",
      messages: 12,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-poppins font-bold text-xl">
              Automa<span className="text-automazap-600">Zap</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-gray-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-poppins font-bold">Dashboard</h1>
            <p className="text-gray-600">Gerencie seus chatbots e monitore desempenho</p>
          </div>
          <Button className="gradient-bg">
            <Plus className="h-4 w-4 mr-2" />
            Novo Bot
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-automazap-100 flex items-center justify-center mb-4">
                <User className="h-10 w-10 text-automazap-600" />
              </div>
              <h3 className="font-semibold text-lg">Olá, Usuário!</h3>
              <p className="text-gray-600 text-sm mt-1">usuário@email.com</p>
              <div className="mt-4 w-full">
                <div className="text-sm text-gray-600 flex justify-between mb-2">
                  <span>Plano atual:</span>
                  <span className="font-semibold">Gratuito</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-automazap-500 h-full" style={{ width: "30%" }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">30/100 mensagens usadas este mês</p>
              </div>
              <Button variant="outline" className="w-full mt-6">
                <Settings className="h-4 w-4 mr-2" />
                Gerenciar Conta
              </Button>
            </div>
          </div>

          {/* Bots Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
              <h2 className="font-semibold text-lg mb-4">Seus Chatbots</h2>
              
              <div className="space-y-4">
                {bots.map((bot) => (
                  <div 
                    key={bot.id} 
                    className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bot.status === 'online' ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <Bot className={`h-5 w-5 ${bot.status === 'online' ? 'text-green-600' : 'text-gray-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {bot.name}
                            <span 
                              className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                bot.status === 'online' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {bot.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                          </h3>
                          <p className="text-gray-500 text-sm">{bot.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center text-gray-500 text-sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span>{bot.messages} mensagens hoje</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {bots.length < 3 && (
                  <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="font-medium text-gray-900">Adicione um novo bot</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                      Crie um novo chatbot personalizado para seu negócio em minutos.
                    </p>
                    <Button variant="outline" className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Bot
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
