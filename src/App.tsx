
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import ChatInterface from "./pages/ChatInterface";
import BotAnalytics from "./pages/BotAnalytics";
import BotUsers from "./pages/BotUsers";
import BotSettings from "./pages/BotSettings";
import BotIntegration from "./pages/BotIntegration";
import Account from "./pages/Account";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";
import BillingHistory from "./pages/BillingHistory";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  // Create a client for React Query
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SubscriptionProvider>
              <BotProvider>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Protected routes */}
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/account" element={<PrivateRoute><Account /></PrivateRoute>} />
                  <Route path="/billing" element={<PrivateRoute><BillingHistory /></PrivateRoute>} />
                  <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                  <Route path="/bot/training" element={<PrivateRoute><BotTraining /></PrivateRoute>} />
                  <Route path="/bot/training/:botId" element={<PrivateRoute><BotTraining /></PrivateRoute>} />
                  <Route path="/bot/details" element={<PrivateRoute><BotDetails /></PrivateRoute>} />
                  <Route path="/bot/details/:botId" element={<PrivateRoute><BotDetails /></PrivateRoute>} />
                  <Route path="/bot/create" element={<PrivateRoute><div className="p-8"><BotCreationWizard /></div></PrivateRoute>} />
                  <Route path="/bot/chat/:botId" element={<PrivateRoute><ChatInterface /></PrivateRoute>} />
                  <Route path="/bot/chat/:botId/:userId" element={<PrivateRoute><ChatInterface /></PrivateRoute>} />
                  <Route path="/bot/analytics/:botId" element={<PrivateRoute><BotAnalytics /></PrivateRoute>} />
                  <Route path="/bot/users/:botId" element={<PrivateRoute><BotUsers /></PrivateRoute>} />
                  <Route path="/bot/settings/:botId" element={<PrivateRoute><BotSettings /></PrivateRoute>} />
                  <Route path="/bot/integration/:botId" element={<PrivateRoute><BotIntegration /></PrivateRoute>} />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BotProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
