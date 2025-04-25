
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-automazap-700 via-automazap-600 to-automazap-500 rounded-2xl p-10 text-white text-center shadow-xl shadow-automazap-100/20">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Transforme seu atendimento hoje
          </h2>
          <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
            Junte-se a milhares de empresas usando o AutomaZap para automatizar atendimento, aumentar satisfação e reduzir custos
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-white text-automazap-600 hover:bg-gray-100 h-12 px-6 text-base">
              <span>Começar Grátis</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 h-12 px-6 text-base"
            >
              <span>Agendar Demonstração</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
