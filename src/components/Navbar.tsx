
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-poppins font-bold text-xl">
              Automa<span className="text-automazap-600">Zap</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <a href="#features" className="text-gray-600 hover:text-automazap-600 transition-colors">
              Recursos
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-automazap-600 transition-colors">
              Planos
            </a>
            <a href="#faq" className="text-gray-600 hover:text-automazap-600 transition-colors">
              FAQ
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="gradient-bg hover:opacity-90">
              <a href="/signup">Começar Grátis</a>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 transition-all duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col space-y-6 text-center">
          <a 
            href="#features" 
            className="text-gray-800 hover:text-automazap-600 py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Recursos
          </a>
          <a 
            href="#pricing" 
            className="text-gray-800 hover:text-automazap-600 py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Planos
          </a>
          <a 
            href="#faq" 
            className="text-gray-800 hover:text-automazap-600 py-2 text-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </a>
          <div className="pt-6 flex flex-col space-y-3">
            <Button variant="outline" asChild>
              <a href="/login">Login</a>
            </Button>
            <Button className="gradient-bg w-full">
              <a href="/signup">Começar Grátis</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
