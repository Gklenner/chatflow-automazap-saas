
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, CreditCard, Loader } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { plans, subscribeToPlan, isProcessingPayment } = useSubscription();
  
  const [planId, setPlanId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    // Get plan ID from URL query params
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get("plan");
    
    if (planParam) {
      setPlanId(planParam);
      const plan = plans.find(p => p.id === planParam);
      if (plan) {
        setSelectedPlan(plan);
      } else {
        toast({
          title: "Erro",
          description: "Plano não encontrado",
          variant: "destructive"
        });
        navigate("/pricing");
      }
    } else {
      navigate("/pricing");
    }
  }, [location.search, plans, navigate]);
  
  useEffect(() => {
    // Validate form
    const isValid = 
      cardNumber.replace(/\s/g, "").length === 16 && 
      cardName.trim().length >= 3 &&
      expiryDate.length === 5 &&
      cvv.length === 3;
      
    setIsFormValid(isValid);
  }, [cardNumber, cardName, expiryDate, cvv]);
  
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    const formatted = numbers.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };
  
  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 3) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    return numbers;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid || !planId) return;
    
    const success = await subscribeToPlan(planId);
    if (success) {
      navigate("/dashboard");
    }
  };
  
  if (!selectedPlan) return null;
  
  return (
    <DashboardLayout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Finalizar assinatura</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-6">Informações de Pagamento</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="cardNumber" 
                        className="pl-10" 
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        disabled={isProcessingPayment}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome no Cartão
                    </label>
                    <Input 
                      id="cardName" 
                      placeholder="JOÃO M SILVA"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      disabled={isProcessingPayment}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Validade
                      </label>
                      <Input 
                        id="expiryDate" 
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        maxLength={5}
                        disabled={isProcessingPayment}
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <Input 
                        id="cvv" 
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        maxLength={3}
                        disabled={isProcessingPayment}
                      />
                    </div>
                  </div>
                  
                  {/* For demo purposes only */}
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm text-yellow-800">
                    <p className="font-medium">👋 Esta é uma demonstração</p>
                    <p className="mt-1">Preencha o formulário com qualquer valor para simular o pagamento. Nenhum pagamento real será processado.</p>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="gradient-bg w-full"
                      disabled={!isFormValid || isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center">
                          <Loader className="animate-spin mr-2 h-5 w-5" />
                          <span>Processando...</span>
                        </div>
                      ) : (
                        `Pagar R$ ${selectedPlan.price},00`
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h2 className="text-lg font-semibold mb-4">Resumo do Pedido</h2>
              
              <div className="py-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{selectedPlan.name}</p>
                    <p className="text-sm text-gray-500">Assinatura mensal</p>
                  </div>
                  <p className="font-semibold">{selectedPlan.price > 0 ? `R$ ${selectedPlan.price},00` : "Grátis"}</p>
                </div>
              </div>
              
              <div className="py-4">
                <h3 className="text-sm font-medium mb-2">O plano inclui:</h3>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-automazap-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between font-medium">
                  <p>Total</p>
                  <p>{selectedPlan.price > 0 ? `R$ ${selectedPlan.price},00/mês` : "Grátis"}</p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Você pode cancelar sua assinatura a qualquer momento pela sua conta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
