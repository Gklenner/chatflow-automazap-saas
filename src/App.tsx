
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import BotTraining from "./pages/BotTraining";
import BotDetails from "./pages/BotDetails";
import NotFound from "./pages/NotFound";
import { BotCreationWizard } from "./components/BotCreationWizard";
import { BotProvider } from "./context/BotContext";
import ChatInterface from "./pages/ChatInterface";
import BotAnalytics from "./pages/BotAnalytics";
import BotUsers from "./pages/BotUsers";
import BotSettings from "./pages/BotSettings";
import BotIntegration from "./pages/BotIntegration";

const App = () => {
  // Create a client for React Query
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <BotProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bot/training" element={<BotTraining />} />
              <Route path="/bot/training/:botId" element={<BotTraining />} />
              <Route path="/bot/details" element={<BotDetails />} />
              <Route path="/bot/details/:botId" element={<BotDetails />} />
              <Route path="/bot/create" element={<div className="p-8"><BotCreationWizard /></div>} />
              <Route path="/bot/chat/:botId" element={<ChatInterface />} />
              <Route path="/bot/chat/:botId/:userId" element={<ChatInterface />} />
              <Route path="/bot/analytics/:botId" element={<BotAnalytics />} />
              <Route path="/bot/users/:botId" element={<BotUsers />} />
              <Route path="/bot/settings/:botId" element={<BotSettings />} />
              <Route path="/bot/integration/:botId" element={<BotIntegration />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BotProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
