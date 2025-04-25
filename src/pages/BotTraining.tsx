
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";  
import { Textarea } from "@/components/ui/textarea";  
import { ChatInterface } from "@/components/ChatInterface";
import { ArrowLeft, Bot, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BotTraining = () => {
  const navigate = useNavigate();
  const [botName] = useState("Assistente de Vendas");

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
            <p className="text-gray-600">Treinamento e Personalização</p>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 mb-4">
            <TabsTrigger value="chat">Conversar</TabsTrigger>
            <TabsTrigger value="files">Arquivos</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ChatInterface />
              </div>
              <div>
                <div className="bg-white rounded-xl border p-6 h-full">
                  <h3 className="font-semibold mb-4">Dicas de Treinamento</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="text-automazap-600 font-bold mr-2">1.</div>
                      <p className="text-gray-700">
                        Faça perguntas comuns que seus clientes poderiam fazer
                      </p>
                    </li>
                    <li className="flex">
                      <div className="text-automazap-600 font-bold mr-2">2.</div>
                      <p className="text-gray-700">
                        Forneça respostas claras e detalhadas para o bot aprender
                      </p>
                    </li>
                    <li className="flex">
                      <div className="text-automazap-600 font-bold mr-2">3.</div>
                      <p className="text-gray-700">
                        Corrija o bot quando ele fornecer informações incorretas
                      </p>
                    </li>
                    <li className="flex">
                      <div className="text-automazap-600 font-bold mr-2">4.</div>
                      <p className="text-gray-700">
                        Ensine ao bot como lidar com diferentes tipos de clientes
                      </p>
                    </li>
                  </ul>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-2">Progresso de Treinamento</h4>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-automazap-600 h-2.5 rounded-full w-[45%]"></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      45% completo - Continue treinando para melhorar seu bot
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="files">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">Upload de Documentos</h3>
              <p className="text-gray-600 mb-6">
                Faça upload de arquivos para treinar seu bot com informações específicas do seu negócio.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="flex flex-col items-center text-center">
                  <Upload className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Arraste arquivos aqui</h3>
                  <p className="text-gray-500 mb-4">
                    Suportamos arquivos PDF, DOCX, TXT até 10MB
                  </p>
                  <Button>
                    Escolher Arquivos
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-4">Arquivos Enviados</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-red-100 text-red-800 rounded flex items-center justify-center mr-3">
                        PDF
                      </div>
                      <div>
                        <p className="font-medium">Manual-Produto.pdf</p>
                        <p className="text-sm text-gray-500">1.2 MB • Enviado ontem</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 text-blue-800 rounded flex items-center justify-center mr-3">
                        TXT
                      </div>
                      <div>
                        <p className="font-medium">FAQ.txt</p>
                        <p className="text-sm text-gray-500">24 KB • Enviado hoje</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remover
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-6">Configurações do Bot</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nome do Bot
                  </label>
                  <Input defaultValue={botName} className="max-w-md" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Personalidade
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Formal", "Amigável", "Divertido", "Profissional"].map((personality) => (
                      <div 
                        key={personality}
                        className={`border rounded-lg p-3 text-center cursor-pointer hover:border-automazap-300 hover:bg-automazap-50 
                          ${personality === "Amigável" ? "border-automazap-500 bg-automazap-50" : ""}`}
                      >
                        {personality}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mensagem de Boas-vindas
                  </label>
                  <Textarea 
                    className="max-w-md"
                    defaultValue="Olá! Sou o assistente virtual da Empresa ABC. Como posso ajudar você hoje?"
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center justify-between py-3 border-t">
                  <div>
                    <h4 className="font-medium">Modo Noturno</h4>
                    <p className="text-sm text-gray-500">Ativar respostas automáticas fora do horário comercial</p>
                  </div>
                  <div className="h-6 w-11 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 left-0.5 shadow"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-t">
                  <div>
                    <h4 className="font-medium">Respostas Automáticas</h4>
                    <p className="text-sm text-gray-500">Responder automaticamente a mensagens comuns</p>
                  </div>
                  <div className="h-6 w-11 bg-automazap-500 rounded-full relative cursor-pointer">
                    <div className="h-5 w-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow"></div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="gradient-bg">
                    Salvar Configurações
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BotTraining;
