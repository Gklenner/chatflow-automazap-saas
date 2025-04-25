import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import DashboardLayout from "@/components/DashboardLayout";

const Pricing = () => {
  const { isAuthenticated, user } = useAuth();
  const { plans, currentPlan, isProcessingPayment } = useSubscription();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    // If not logged in, redirect to signup
    if (!isAuthenticated) {
      navigate(`/signup?plan=${planId}`);
      return;
    }
    
    // Otherwise, go to checkout page
    navigate(`/checkout?plan=${planId}`);
  };

  const renderPricingCard = (plan) => {
    const isCurrentPlan = user?.subscriptionPlan === plan.id;
    const isFree = plan.price === 0;
    
    return (
      <div
        key={plan.id}
        className={`rounded-xl p-8 border ${
          isCurrentPlan
            ? "border-automazap-300 shadow-lg shadow-automazap-100/20"
            : "border-gray-200"
        } ${isCurrentPlan ? "bg-white" : "bg-white"}`}
      >
        {isCurrentPlan && (
          <div className="bg-automazap-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto mb-4">
            SEU PLANO ATUAL
          </div>
        )}
        <h3 className="font-poppins font-bold text-xl mb-2 text-center">
          {plan.name}
        </h3>
        <div className="text-center mb-6">
          <span className="text-3xl font-bold">
            {isFree ? "Grátis" : `R$ ${plan.price}`}
          </span>
          {!isFree && <span className="text-gray-500 ml-1">/mês</span>}
        </div>

        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-automazap-500 mr-2 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className={`w-full ${
            isCurrentPlan ? "bg-gray-100 text-gray-500 hover:bg-gray-200" : (plan.id === "free" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "gradient-bg hover:opacity-90")
          }`}
          onClick={() => handleSelectPlan(plan.id)}
          disabled={isCurrentPlan || isProcessingPayment}
        >
          {isCurrentPlan ? "Plano atual" : (plan.id === "free" ? "Usar plano gratuito" : "Assinar agora")}
        </Button>
      </div>
    );
  };

  return (
    <>
      {isAuthenticated ? (
        <DashboardLayout>
          <div className="container px-4 py-12 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
                Escolha o{" "}
                <span className="gradient-text">plano perfeito</span> para seu negócio
              </h1>
              <p className="text-gray-600 text-lg">
                Comece gratuitamente e escale conforme seu negócio cresce. Cancele a qualquer momento.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map(renderPricingCard)}
            </div>
          </div>
        </DashboardLayout>
      ) : (
        <>
          <Navbar />
          <section id="pricing" className="py-20">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
                  Planos para todos os{" "}
                  <span className="gradient-text">tamanhos de negócio</span>
                </h2>
                <p className="text-gray-600 text-lg">
                  Comece gratuitamente e escale conforme seu negócio cresce. Cancele a qualquer momento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plans.map(renderPricingCard)}
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default Pricing;
