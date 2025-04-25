
import React, { createContext, useContext, useState } from "react";
import { SubscriptionPlan } from "@/types/bot";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/use-toast";

interface SubscriptionContextType {
  plans: SubscriptionPlan[];
  currentPlan: SubscriptionPlan | null;
  subscribeToPlan: (planId: string) => Promise<boolean>;
  cancelSubscription: () => Promise<boolean>;
  isProcessingPayment: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Mock subscription plans
const availablePlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Gratuito",
    price: 0,
    features: [
      "1 bot ativo",
      "100 mensagens/mês",
      "Respostas básicas",
      "Documentação e suporte comunitário"
    ],
    botLimit: 1,
    messageLimit: 100,
    includes: {
      fileUpload: false,
      apiAccess: false,
      prioritySupport: false,
      advancedAnalytics: false,
      customBranding: false,
      multiLanguage: false
    }
  },
  {
    id: "pro",
    name: "Profissional",
    price: 99,
    features: [
      "5 bots ativos",
      "5.000 mensagens/mês",
      "Respostas avançadas com contexto",
      "Upload de documentos (PDFs, textos)",
      "Suporte por e-mail"
    ],
    botLimit: 5,
    messageLimit: 5000,
    includes: {
      fileUpload: true,
      apiAccess: true,
      prioritySupport: false,
      advancedAnalytics: true,
      customBranding: false,
      multiLanguage: true
    }
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: 249,
    features: [
      "Bots ilimitados",
      "20.000 mensagens/mês",
      "IA avançada personalizada",
      "Upload ilimitado de materiais",
      "Integrações personalizadas",
      "Suporte prioritário"
    ],
    botLimit: -1, // unlimited
    messageLimit: 20000,
    includes: {
      fileUpload: true,
      apiAccess: true,
      prioritySupport: true,
      advancedAnalytics: true,
      customBranding: true,
      multiLanguage: true
    }
  }
];

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateProfile } = useAuth();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const currentPlan = user?.subscriptionPlan 
    ? availablePlans.find(plan => plan.id === user.subscriptionPlan) 
    : availablePlans[0]; // Default to free plan

  const subscribeToPlan = async (planId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Erro na assinatura",
        description: "Você precisa estar logado para assinar um plano",
        variant: "destructive"
      });
      return false;
    }

    const plan = availablePlans.find(p => p.id === planId);
    if (!plan) {
      toast({
        title: "Erro na assinatura",
        description: "Plano não encontrado",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessingPayment(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user subscription details
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);
      
      await updateProfile({
        subscriptionStatus: "active",
        subscriptionPlan: planId,
        subscriptionEndDate
      });
      
      toast({
        title: "Assinatura realizada com sucesso",
        description: `Você agora é assinante do plano ${plan.name}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro ao processar pagamento",
        description: "Não foi possível completar sua assinatura. Por favor, tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const cancelSubscription = async (): Promise<boolean> => {
    if (!user || user.subscriptionStatus !== "active") {
      toast({
        title: "Erro ao cancelar",
        description: "Você não possui uma assinatura ativa para cancelar",
        variant: "destructive"
      });
      return false;
    }

    setIsProcessingPayment(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await updateProfile({
        subscriptionStatus: "canceled"
      });
      
      toast({
        title: "Assinatura cancelada",
        description: "Sua assinatura foi cancelada com sucesso. Você ainda terá acesso até o fim do período pago.",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Erro ao cancelar assinatura",
        description: "Não foi possível cancelar sua assinatura. Por favor, tente novamente.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      plans: availablePlans,
      currentPlan,
      subscribeToPlan,
      cancelSubscription,
      isProcessingPayment
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
};
