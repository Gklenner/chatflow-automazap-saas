
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Bot, Check, Upload } from "lucide-react";
import { useBots } from "@/context/BotContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BotCreationData } from "@/types/bot";

type Step = "info" | "knowledge" | "connection" | "complete";

export const BotCreationWizard = () => {
  const [step, setStep] = useState<Step>("info");
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [personality, setPersonality] = useState<"Formal" | "Amigável" | "Divertido">("Amigável");
  const [knowledgeSource, setKnowledgeSource] = useState<"files" | "conversation">("files");
  
  const { createBot } = useBots();
  const navigate = useNavigate();

  const goToNextStep = () => {
    if (step === "info") {
      if (!botName.trim()) {
        toast.error("Por favor, insira um nome para o bot.");
        return;
      }
      setStep("knowledge");
    } else if (step === "knowledge") {
      setStep("connection");
    } else if (step === "connection") {
      const botData: BotCreationData = {
        name: botName,
        description: botDescription,
        personality: personality,
        knowledgeSource: knowledgeSource
      };
      createBot(botData);
      setStep("complete");
    }
  };

  const goToPreviousStep = () => {
    if (step === "knowledge") {
      setStep("info");
    } else if (step === "connection") {
      setStep("knowledge");
    }
  };

  const handlePersonalitySelect = (selected: "Formal" | "Amigável" | "Divertido") => {
    setPersonality(selected);
  };

  const handleKnowledgeSourceSelect = (source: "files" | "conversation") => {
    setKnowledgeSource(source);
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Crie seu Bot Inteligente</CardTitle>
        <CardDescription>
          Siga os passos para configurar um chatbot personalizado para seu negócio
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Step progress indicator */}
        <div className="flex mb-8">
          {["Informações", "Conhecimento", "Conexão", "Concluído"].map((stepName, index) => (
            <div key={index} className="flex-1">
              <div className="relative flex items-center justify-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center z-10 
                    ${index === ["info", "knowledge", "connection", "complete"].indexOf(step) 
                      ? "bg-automazap-600 text-white" 
                      : index < ["info", "knowledge", "connection", "complete"].indexOf(step) 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-500"}`}
                >
                  {index < ["info", "knowledge", "connection", "complete"].indexOf(step) ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < 3 && (
                  <div 
                    className={`absolute top-5 w-full h-0.5 left-1/2 
                      ${index < ["info", "knowledge", "connection", "complete"].indexOf(step) 
                        ? "bg-green-500" 
                        : "bg-gray-200"}`}
                  />
                )}
              </div>
              <div className="text-center mt-2 text-sm">
                <span className={index <= ["info", "knowledge", "connection", "complete"].indexOf(step) 
                  ? "text-automazap-600 font-medium" 
                  : "text-gray-500"}
                >
                  {stepName}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Step content */}
        {step === "info" && (
          <div className="space-y-4">
            <div>
              <label htmlFor="botName" className="block text-sm font-medium mb-1">
                Nome do Bot
              </label>
              <Input
                id="botName"
                placeholder="Ex: Assistente de Vendas"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="botDescription" className="block text-sm font-medium mb-1">
                Descrição
              </label>
              <Textarea
                id="botDescription"
                placeholder="Descreva a função do seu bot"
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Personalidade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Formal", "Amigável", "Divertido"].map((personalityType) => (
                  <div 
                    key={personalityType}
                    className={`border rounded-lg p-3 text-center cursor-pointer hover:border-automazap-300 hover:bg-automazap-50 ${
                      personality === personalityType ? "border-automazap-500 bg-automazap-50" : ""
                    }`}
                    onClick={() => handlePersonalitySelect(personalityType as "Formal" | "Amigável" | "Divertido")}
                  >
                    {personalityType}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "knowledge" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Como seu bot aprenderá?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-automazap-300 hover:bg-automazap-50 ${
                    knowledgeSource === "files" ? "border-automazap-500 bg-automazap-50" : ""
                  }`}
                  onClick={() => handleKnowledgeSourceSelect("files")}
                >
                  <div className="flex flex-col items-center text-center">
                    <Upload className="h-8 w-8 text-automazap-600 mb-2" />
                    <h4 className="font-medium">Enviar arquivos</h4>
                    <p className="text-sm text-gray-500">
                      Upload de PDFs, documentos e textos
                    </p>
                  </div>
                </div>
                <div 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-automazap-300 hover:bg-automazap-50 ${
                    knowledgeSource === "conversation" ? "border-automazap-500 bg-automazap-50" : ""
                  }`}
                  onClick={() => handleKnowledgeSourceSelect("conversation")}
                >
                  <div className="flex flex-col items-center text-center">
                    <Bot className="h-8 w-8 text-automazap-600 mb-2" />
                    <h4 className="font-medium">Conversar com o bot</h4>
                    <p className="text-sm text-gray-500">
                      Treine através de perguntas e respostas
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 border-dashed">
              <div className="flex flex-col items-center text-center py-8">
                <Upload className="h-12 w-12 text-gray-400 mb-2" />
                <h4 className="font-medium">Arraste arquivos aqui</h4>
                <p className="text-sm text-gray-500 mb-4">
                  Suportamos PDF, DOC, TXT (máx. 10MB)
                </p>
                <Button variant="outline">
                  Escolher Arquivos
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === "connection" && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">Conectar ao WhatsApp</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Método de Conexão</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Escolha como deseja conectar seu bot ao WhatsApp
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="qrcode" 
                        name="connection" 
                        className="h-4 w-4 text-automazap-600 focus:ring-automazap-500"
                        defaultChecked
                      />
                      <label htmlFor="qrcode" className="ml-2 text-sm">
                        QR Code (WhatsApp Web)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="api" 
                        name="connection" 
                        className="h-4 w-4 text-automazap-600 focus:ring-automazap-500"
                      />
                      <label htmlFor="api" className="ml-2 text-sm">
                        API Oficial (Business)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <div className="border-4 border-gray-800 rounded-lg w-48 h-48 flex items-center justify-center mb-4">
                <div className="text-center">
                  <p className="text-gray-800 font-medium">QR Code</p>
                  <p className="text-gray-500 text-xs">Aparecerá aqui</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 text-center max-w-sm">
                Quando você prosseguir, um QR Code será gerado. 
                Escaneie-o com seu WhatsApp para conectar seu bot.
              </p>
            </div>
          </div>
        )}

        {step === "complete" && (
          <div className="text-center py-8">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Bot criado com sucesso!</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Seu bot está pronto para uso. Você pode começar a conversar com ele agora
              ou personalizá-lo ainda mais.
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/bot/details")}>
                Personalizar Bot
              </Button>
              <Button className="gradient-bg" onClick={handleComplete}>
                Começar a Conversar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step !== "info" && step !== "complete" && (
          <Button variant="ghost" onClick={goToPreviousStep}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        )}
        {step === "info" && <div />}
        {step === "complete" && <div />}
        
        {step !== "complete" && (
          <Button className="gradient-bg" onClick={goToNextStep}>
            {step === "connection" ? "Finalizar" : "Próximo"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
