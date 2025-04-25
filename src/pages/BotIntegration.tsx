
import { useParams, Link } from "react-router-dom";
import { useBots } from "@/context/BotContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Globe, QrCode, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BotIntegration = () => {
  const { botId } = useParams();
  const { getBot, updateBot } = useBots();
  const [copied, setCopied] = useState(false);
  const [qrVisible, setQrVisible] = useState(false);
  
  const bot = botId ? getBot(botId) : undefined;
  
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
  
  const embedCode = `<script src="https://automazap.com/embed.js" data-bot-id="${botId}"></script>`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    toast.success("Código copiado para a área de transferência");
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleWhatsappIntegration = () => {
    setQrVisible(true);
    setTimeout(() => {
      // Simulate successful connection
      updateBot(botId, { 
        integrationType: "whatsapp", 
        integrationStatus: "connected" 
      });
      toast.success("WhatsApp conectado com sucesso!");
    }, 3000);
  };
  
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
        <h1 className="text-2xl font-bold mb-1">{bot.name} - Integrações</h1>
        <p className="text-gray-600">Conecte seu bot a diferentes plataformas</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Website Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Integração com Website</CardTitle>
            <CardDescription>Adicione o bot ao seu site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
                {embedCode}
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-blue-800">
              <p>Adicione este código antes da tag {'</body>'} no seu HTML para incorporar o widget de chat.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">
              <Globe className="h-4 w-4 mr-1" />
              <span>Customizar widget</span>
            </Button>
          </CardFooter>
        </Card>
        
        {/* WhatsApp Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Integração com WhatsApp</CardTitle>
            <CardDescription>Conecte o bot ao WhatsApp Business API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {qrVisible ? (
              <div className="bg-white p-6 flex justify-center">
                <div className="bg-gray-800 p-8 rounded-lg">
                  <div className="w-48 h-48 mx-auto bg-white grid grid-cols-6 grid-rows-6 gap-1 p-2">
                    {Array(36).fill(0).map((_, i) => (
                      <div 
                        key={i} 
                        className={`${Math.random() > 0.5 ? 'bg-gray-800' : 'bg-transparent'}`}
                      ></div>
                    ))}
                  </div>
                  <p className="text-center text-white mt-4">Escaneie este QR Code</p>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 p-4 rounded-md text-sm text-green-800">
                <p className="mb-2"><strong>Benefícios:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Atendimento automático via WhatsApp</li>
                  <li>Integração com número de telefone existente</li>
                  <li>Transferência para atendimento humano</li>
                  <li>Envio de arquivos e mídias</li>
                </ul>
              </div>
            )}
          </CardContent>
          <CardFooter>
            {bot.integrationStatus === "connected" ? (
              <div className="w-full flex items-center justify-center space-x-2 p-2 bg-green-100 text-green-800 rounded-md">
                <Check className="h-4 w-4" />
                <span>WhatsApp Conectado</span>
              </div>
            ) : (
              <Button className="w-full gradient-bg" onClick={handleWhatsappIntegration}>
                <QrCode className="h-4 w-4 mr-1" />
                <span>Conectar WhatsApp</span>
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Mais Integrações</CardTitle>
            <CardDescription>Conecte com outras plataformas (em breve)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 opacity-60 flex flex-col items-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png" 
                  alt="Telegram" 
                  className="w-12 h-12 mb-2" 
                />
                <h3 className="font-medium">Telegram</h3>
                <p className="text-xs text-center text-gray-500">Em breve</p>
              </div>
              
              <div className="border rounded-lg p-4 opacity-60 flex flex-col items-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png" 
                  alt="Facebook Messenger" 
                  className="w-12 h-12 mb-2" 
                />
                <h3 className="font-medium">Messenger</h3>
                <p className="text-xs text-center text-gray-500">Em breve</p>
              </div>
              
              <div className="border rounded-lg p-4 opacity-60 flex flex-col items-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5968/5968756.png" 
                  alt="Instagram" 
                  className="w-12 h-12 mb-2" 
                />
                <h3 className="font-medium">Instagram</h3>
                <p className="text-xs text-center text-gray-500">Em breve</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BotIntegration;
