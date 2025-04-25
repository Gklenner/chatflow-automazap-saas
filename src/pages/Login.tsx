
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login functionality - would connect to Supabase in a real implementation
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
          <h2 className="mt-6 text-3xl font-bold font-poppins">Login</h2>
          <p className="mt-2 text-gray-600">
            Acesse sua conta do AutomaZap
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
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
                autoComplete="current-password"
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-automazap-600 focus:ring-automazap-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Lembrar de mim
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-automazap-600 hover:text-automazap-500">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <Button type="submit" className="gradient-bg w-full">
              Entrar
            </Button>
          </div>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-gray-600">Não tem uma conta? </span>
          <a 
            href="/signup" 
            className="font-medium text-automazap-600 hover:text-automazap-500"
          >
            Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
