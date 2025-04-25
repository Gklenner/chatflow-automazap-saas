
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronRight, MessageSquare, Users, Bot as BotIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState("welcome");
  const [companyName, setCompanyName] = useState(user?.company || "");
  const [usageGoal, setUsageGoal] = useState<string>("");
  
  const handleCompanyUpdate = async () => {
    try {
      await updateProfile({ company: companyName });
      setStep("goals");
      toast.success("Informações da empresa salvas!");
    } catch (error) {
      toast.error("Erro ao salvar informações");
    }
  };
  
  const handleComplete = async () => {
    try {
      // Save user's goal if needed
      // await updateProfile({ usageGoal });
      
      toast.success("Configuração inicial concluída!");
      navigate("/bot/create");
    } catch (error) {
      toast.error("Erro ao concluir onboarding");
    }
  };
  
  const handleSkip = () => {
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-automazap-50 to-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Bem-vindo ao AutomaZap!</CardTitle>
          <CardDescription>Vamos configurar sua conta para começar</CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs value={step} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger 
                value="welcome" 
                disabled={step !== "welcome"}
                className="data-[state=active]:bg-automazap-100 data-[state=active]:text-automazap-700"
              >
                Boas-vindas
              </TabsTrigger>
              <TabsTrigger 
                value="goals" 
                disabled={step !== "goals"} 
                className="data-[state=active]:bg-automazap-100 data-[state=active]:text-automazap-700"
              >
                Objetivos
              </TabsTrigger>
              <TabsTrigger 
                value="finish" 
                disabled={step !== "finish"}
                className="data-[state=active]:bg-automazap-100 data-[state=active]:text-automazap-700"
              >
                Conclusão
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="welcome" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Sobre sua empresa</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da empresa</Label>
                    <Input 
                      id="companyName" 
                      placeholder="Digite o nome da sua empresa" 
                      value={companyName} 
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleSkip}>
                  Pular
                </Button>
                <Button onClick={handleCompanyUpdate} className="gradient-bg">
                  Continuar <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="goals" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Como você pretende usar o AutomaZap?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center text-left border-2 hover:border-automazap-400 hover:bg-automazap-50"
                    onClick={() => setUsageGoal("customer_service")}
                  >
                    <MessageSquare className="h-8 w-8 mb-2 text-automazap-600" />
                    <span className="font-semibold">Atendimento ao Cliente</span>
                    <p className="text-sm text-muted-foreground mt-1">Automatizar respostas de suporte</p>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-4 flex flex-col items-center justify-center text-left border-2 hover:border-automazap-400 hover:bg-automazap-50"
                    onClick={() => setUsageGoal("lead_generation")}
                  >
                    <Users className="h-8 w-8 mb-2 text-automazap-600" />
                    <span className="font-semibold">Geração de Leads</span>
                    <p className="text-sm text-muted-foreground mt-1">Capturar e qualificar leads</p>
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleSkip}>
                  Pular
                </Button>
                <Button onClick={() => setStep("finish")} className="gradient-bg">
                  Continuar <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="finish" className="mt-6 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Tudo pronto para começar!</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                  Vamos criar seu primeiro bot para WhatsApp?
                </p>
                
                <div className="bg-automazap-50 p-6 rounded-lg w-full max-w-md">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-automazap-100 flex items-center justify-center">
                      <BotIcon className="h-6 w-6 text-automazap-600" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold">Seu primeiro bot</h4>
                      <p className="text-sm text-muted-foreground">
                        Configure em minutos e comece a interagir com seus clientes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleSkip}>
                  Ir para Dashboard
                </Button>
                <Button onClick={handleComplete} className="gradient-bg">
                  Criar meu primeiro bot <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
