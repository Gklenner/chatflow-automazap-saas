
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/types/bot";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    email: "demo@example.com",
    name: "Demo User",
    company: "Demo Company",
    subscriptionStatus: "active",
    subscriptionPlan: "pro",
    subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    lastLogin: new Date(),
    botsCreated: 3,
    messagesUsed: 1250,
    paymentMethod: {
      type: "credit_card",
      lastFour: "4242",
      expiryDate: "12/24"
    }
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("automazap_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock authentication check
      const foundUser = mockUsers.find(u => u.email === email);
      
      if (!foundUser) {
        throw new Error("Usuário não encontrado");
      }
      
      // In a real implementation, we would check password here
      
      // Update last login
      const updatedUser = {
        ...foundUser,
        lastLogin: new Date()
      };
      
      setUser(updatedUser);
      localStorage.setItem("automazap_user", JSON.stringify(updatedUser));
      toast({
        title: "Login realizado com sucesso",
        description: `Bem-vindo de volta, ${updatedUser.name}!`,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Erro ao fazer login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error("Email já está em uso");
      }
      
      // Create new user
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        name,
        subscriptionStatus: "trial",
        subscriptionEndDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        lastLogin: new Date(),
        botsCreated: 0,
        messagesUsed: 0
      };
      
      mockUsers.push(newUser);
      setUser(newUser);
      localStorage.setItem("automazap_user", JSON.stringify(newUser));
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Sua conta foi criada e você já pode começar a usar o AutomaZap!",
      });
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Erro ao criar conta",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("automazap_user");
    navigate("/");
    toast({
      title: "Logout realizado com sucesso",
      description: "Volte em breve!",
    });
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) throw new Error("Usuário não autenticado");
      
      const updatedUser = {
        ...user,
        ...data
      };
      
      setUser(updatedUser);
      localStorage.setItem("automazap_user", JSON.stringify(updatedUser));
      
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso",
      });
      
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: error instanceof Error ? error.message : "Erro ao atualizar informações",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      signup,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
