
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock signup functionality - would connect to Supabase in a real implementation
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold font-poppins">Cadastre-se</h2>
          <p className="mt-2 text-gray-600">
            Crie sua conta gratuitamente no AutomaZap
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="mt-1"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirme sua senha
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-automazap-600 focus:ring-automazap-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Concordo com os{" "}
              <a href="#" className="text-automazap-600 hover:text-automazap-500">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-automazap-600 hover:text-automazap-500">
                Política de Privacidade
              </a>
            </label>
          </div>

          <div>
            <Button type="submit" className="gradient-bg w-full">
              Criar conta
            </Button>
          </div>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-gray-600">Já tem uma conta? </span>
          <a 
            href="/login" 
            className="font-medium text-automazap-600 hover:text-automazap-500"
          >
            Faça login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
