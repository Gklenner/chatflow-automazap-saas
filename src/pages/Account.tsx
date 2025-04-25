
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/DashboardLayout";
import { Edit, Save, User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Account = () => {
  const { user, updateProfile } = useAuth();
  const { currentPlan } = useSubscription();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [company, setCompany] = useState(user?.company || "");
  
  const handleSave = async () => {
    await updateProfile({
      name,
      company
    });
    setIsEditing(false);
  };
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Informações Pessoais</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
                  </Button>
                </div>
                <CardDescription>Gerencie seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarFallback className="text-xl bg-automazap-100 text-automazap-600">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="link" className="mt-2">
                      Alterar foto
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo
                      </label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Seu nome"
                        />
                      ) : (
                        <div className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-md">
                          {user.name}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <div className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-md">
                        {user.email}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa
                      </label>
                      {isEditing ? (
                        <Input
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Nome da empresa"
                        />
                      ) : (
                        <div className="py-2.5 px-3 bg-gray-50 border border-gray-200 rounded-md">
                          {user.company || "Não informada"}
                        </div>
                      )}
                    </div>
                    
                    {isEditing && (
                      <div className="pt-2">
                        <Button onClick={handleSave} className="gradient-bg">
                          Salvar alterações
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Seu Plano</CardTitle>
                <CardDescription>Informações sobre sua assinatura</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-automazap-200 bg-automazap-50">
                    <h3 className="font-semibold text-lg">{currentPlan?.name || "Plano Gratuito"}</h3>
                    {currentPlan?.price ? (
                      <p className="text-gray-600">R$ {currentPlan.price}/mês</p>
                    ) : (
                      <p className="text-gray-600">Gratuito</p>
                    )}
                    
                    {user.subscriptionStatus === "active" && user.subscriptionEndDate && (
                      <p className="text-sm text-gray-600 mt-2">
                        Próxima cobrança em {new Date(user.subscriptionEndDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                    
                    {user.subscriptionStatus === "trial" && user.subscriptionEndDate && (
                      <p className="text-sm text-gray-600 mt-2">
                        Período de testes termina em {new Date(user.subscriptionEndDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline" asChild>
                      <a href="/pricing">Ver todos os planos</a>
                    </Button>
                    
                    {user.subscriptionStatus === "active" && (
                      <Button className="w-full" variant="outline" asChild>
                        <a href="/billing">Histórico de pagamentos</a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
