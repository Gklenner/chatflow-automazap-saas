
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 space-y-6 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
              Crie chatbots inteligentes para{" "}
              <span className="gradient-text">WhatsApp</span> em minutos
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-md md:max-w-lg mx-auto md:mx-0">
              Automatize seu atendimento com chatbots personalizados que aprendem e melhoram com o tempo. Comece grátis, sem código.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button className="gradient-bg hover:opacity-90 h-12 px-6 text-base" size="lg">
                <span>Começar Grátis</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-automazap-200 h-12 px-6 text-base" size="lg">
                <span>Ver Demonstração</span>
              </Button>
            </div>
            <div className="pt-6 text-sm text-gray-500">
              <p>✓ Sem cartão de crédito &nbsp; ✓ Configuração simples &nbsp; ✓ Cancele quando quiser</p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 max-w-md mx-auto">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-2 text-sm text-gray-500">AutomaZap Dashboard</div>
              </div>
              <div className="space-y-4">
                <div className="bg-automazap-50 p-4 rounded-lg border border-automazap-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-automazap-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div className="ml-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-sm">
                      <p>Olá! Como posso ajudar você hoje?</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gray-100 p-3 rounded-lg text-sm max-w-[80%]">
                    <p>Quais são os horários de atendimento da loja?</p>
                  </div>
                </div>
                <div className="bg-automazap-50 p-4 rounded-lg border border-automazap-100">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-automazap-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div className="ml-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-sm">
                      <p>Nossa loja está aberta de segunda a sexta, das 9h às 18h, e aos sábados das 9h às 13h. Posso ajudar com mais alguma coisa?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 relative">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-automazap-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-automazap-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-automazap-100 rounded-full opacity-70 blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-automazap-200 rounded-full opacity-70 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
