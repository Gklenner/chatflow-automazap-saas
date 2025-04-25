
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Como funciona o AutomaZap?",
    answer:
      "O AutomaZap permite que você crie um chatbot inteligente que se conecta ao WhatsApp. Basta se cadastrar, criar seu bot, treinar com seus conhecimentos específicos e conectar ao WhatsApp. Em minutos, seu bot estará pronto para interagir com seus clientes."
  },
  {
    question: "Preciso ter conhecimentos técnicos para usar?",
    answer:
      "Não! O AutomaZap foi projetado para ser fácil de usar, sem necessidade de conhecimentos de programação. Nossa interface intuitiva permite que qualquer pessoa configure e treine um chatbot rapidamente."
  },
  {
    question: "Como faço para treinar meu bot?",
    answer:
      "Há duas maneiras de treinar seu bot: conversando diretamente com ele, como se estivesse ensinando a um novo funcionário, ou fazendo upload de documentos como PDFs, manuais e textos que contenham informações sobre seu negócio."
  },
  {
    question: "Posso personalizar as respostas do meu bot?",
    answer:
      "Sim! Você tem controle total sobre como seu bot responde. Você pode definir o tom, personalidade e até mesmo criar fluxos de conversa específicos para diferentes cenários de atendimento."
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Todos os dados são criptografados e armazenados com segurança. Não compartilhamos suas informações com terceiros e você mantém total propriedade sobre seus dados."
  },
  {
    question: "Como o bot se conecta ao WhatsApp?",
    answer:
      "Utilizamos a API oficial do WhatsApp ou serviços de conexão como Z-API, que permitem a integração segura e aprovada com o WhatsApp. Você precisa apenas seguir alguns passos simples para autorizar a conexão."
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Perguntas <span className="gradient-text">frequentes</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Tudo o que você precisa saber sobre o AutomaZap
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-medium py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
