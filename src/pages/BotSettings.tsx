
import { useParams, Link, useNavigate } from "react-router-dom";
import { useBots } from "@/context/BotContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bot, Trash2, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Bot as BotType } from "@/types/bot";

const BotSettings = () => {
  const { botId } = useParams();
  const { getBot, updateBot, deleteBot } = useBots();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<BotType>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const bot = botId ? getBot(botId) : undefined;
  
  useEffect(() => {
    if (bot) {
      setFormData({
        name: bot.name,
        description: bot.description,
        personality: bot.personality,
        welcomeMessage: bot.welcomeMessage,
        language: bot.language,
        responseTime: bot.responseTime,
        isActive: bot.isActive,
        aiModel: bot.aiModel || "gpt-3.5-turbo"
      });
    }
  }, [bot]);
  
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
  
  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = () => {
    if (!botId) return;
    
    setIsLoading(true);
    
    try {
      updateBot(botId, formData);
      toast.success("Configurações salvas com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar configurações");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDelete = () => {
    if (!botId) return;
    
    if (window.confirm("Tem certeza que deseja excluir este bot? Esta ação não pode ser desfeita.")) {
      deleteBot(botId);
      navigate("/dashboard");
    }
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
        <h1 className="text-2xl font-bold mb-1">{bot.name} - Configurações</h1>
        <p className="text-gray-600">Personalizar configurações do bot</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Informações básicas sobre o bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Bot</Label>
                <Input 
                  id="name" 
                  value={formData.name || ""} 
                  onChange={(e) => handleChange("name", e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description" 
                  value={formData.description || ""} 
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={3}  
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Mensagem de Boas-vindas</Label>
                <Textarea 
                  id="welcomeMessage" 
                  value={formData.welcomeMessage || ""} 
                  onChange={(e) => handleChange("welcomeMessage", e.target.value)}
                  rows={2}  
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personality">Personalidade</Label>
                  <Select 
                    value={formData.personality || "Amigável"} 
                    onValueChange={(value) => handleChange("personality", value as "Formal" | "Amigável" | "Divertido")}
                  >
                    <SelectTrigger id="personality">
                      <SelectValue placeholder="Selecione uma personalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Formal">Formal</SelectItem>
                      <SelectItem value="Amigável">Amigável</SelectItem>
                      <SelectItem value="Divertido">Divertido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select 
                    value={formData.language || "pt-BR"} 
                    onValueChange={(value) => handleChange("language", value as "pt-BR" | "en-US" | "es-ES")}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Selecione um idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português</SelectItem>
                      <SelectItem value="en-US">Inglês</SelectItem>
                      <SelectItem value="es-ES">Espanhol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Status & Model Settings */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Status do Bot</CardTitle>
              <CardDescription>Controle o estado do seu bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Bot ativo</Label>
                <Switch 
                  id="isActive" 
                  checked={formData.isActive || false} 
                  onCheckedChange={(checked) => handleChange("isActive", checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Modelo de IA</CardTitle>
              <CardDescription>Configure o comportamento da IA</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aiModel">Modelo</Label>
                <Select 
                  value={formData.aiModel || "gpt-3.5-turbo"} 
                  onValueChange={(value) => handleChange("aiModel", value)}
                >
                  <SelectTrigger id="aiModel">
                    <SelectValue placeholder="Selecione um modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                    <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="responseTime">Tempo de resposta</Label>
                <Select 
                  value={formData.responseTime || "Normal"} 
                  onValueChange={(value) => handleChange("responseTime", value as "Rápido" | "Normal" | "Detalhado")}
                >
                  <SelectTrigger id="responseTime">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rápido">Rápido</SelectItem>
                    <SelectItem value="Normal">Normal</SelectItem>
                    <SelectItem value="Detalhado">Detalhado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Zona de perigo</CardTitle>
              <CardDescription>Ações destrutivas para o bot</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                <span>Excluir Bot</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Save button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="gradient-bg">
          {isLoading ? "Salvando..." : (
            <>
              <Save className="h-4 w-4 mr-1" />
              <span>Salvar alterações</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default BotSettings;
