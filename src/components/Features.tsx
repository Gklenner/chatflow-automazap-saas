
import { Bot, MessageSquare, Upload, Zap } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-8 w-8 text-white" />,
    title: "Bots Inteligentes",
    description:
      "Crie chatbots que aprendem com cada interação e fornecem respostas personalizadas com tecnologia de IA avançada."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Integração WhatsApp",
    description:
      "Conecte seu bot diretamente ao WhatsApp sem complicações. Sem necessidade de apps adicionais para seus clientes."
  },
  {
    icon: <Upload className="h-8 w-8 text-white" />,
    title: "Treinamento Simples",
    description:
      "Faça upload de documentos, manuais ou dados do seu negócio para treinar o bot. Converse com ele para refinar seu conhecimento."
  },
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    title: "Configuração Rápida",
    description:
      "Em poucos minutos, configure seu bot com uma interface intuitiva. Sem conhecimentos técnicos necessários."
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Tudo que você precisa para{" "}
            <span className="gradient-text">automatizar seu atendimento</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Nossa plataforma oferece todas as ferramentas para criar um assistente virtual poderoso e personalizado para seu negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-14 w-14 rounded-lg gradient-bg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
