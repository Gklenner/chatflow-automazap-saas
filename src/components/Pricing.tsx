
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const pricingTiers = [
  {
    name: "Grátis",
    price: "R$ 0",
    description: "Para pequenos negócios começarem.",
    features: [
      "1 bot ativo",
      "100 mensagens/mês",
      "Respostas básicas",
      "Documentação e suporte comunitário"
    ],
    cta: "Começar agora",
    highlight: false
  },
  {
    name: "Profissional",
    price: "R$ 99",
    period: "/mês",
    description: "Para empresas em crescimento.",
    features: [
      "5 bots ativos",
      "5.000 mensagens/mês",
      "Respostas avançadas com contexto",
      "Upload de documentos (PDFs, textos)",
      "Suporte por e-mail"
    ],
    cta: "Assinar agora",
    highlight: true
  },
  {
    name: "Empresarial",
    price: "R$ 249",
    period: "/mês",
    description: "Para negócios estabelecidos.",
    features: [
      "Bots ilimitados",
      "20.000 mensagens/mês",
      "IA avançada personalizada",
      "Upload ilimitado de materiais",
      "Integrações personalizadas",
      "Suporte prioritário"
    ],
    cta: "Contate vendas",
    highlight: false
  }
];

export const Pricing = () => {
  return (
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
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 border ${
                tier.highlight
                  ? "border-automazap-300 shadow-lg shadow-automazap-100/20"
                  : "border-gray-200"
              } ${tier.highlight ? "bg-white" : "bg-white"}`}
            >
              {tier.highlight && (
                <div className="bg-automazap-600 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mx-auto mb-4">
                  MAIS POPULAR
                </div>
              )}
              <h3 className="font-poppins font-bold text-xl mb-2 text-center">
                {tier.name}
              </h3>
              <div className="text-center mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="text-gray-500 ml-1">{tier.period}</span>
                )}
                <p className="text-gray-500 mt-2">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-automazap-500 mr-2 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlight ? "gradient-bg hover:opacity-90" : ""
                }`}
                variant={tier.highlight ? "default" : "outline"}
              >
                {tier.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
