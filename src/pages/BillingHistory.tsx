
import { useAuth } from "@/context/AuthContext";
import { useSubscription } from "@/context/SubscriptionContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FileDown, CreditCard, AlertTriangle } from "lucide-react";

// Mock billing history data
const mockInvoices = [
  {
    id: "INV-001",
    date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
    amount: 99,
    status: "paid",
    cardEnding: "4242"
  },
  {
    id: "INV-002",
    date: new Date(),
    amount: 99,
    status: "pending",
    cardEnding: "4242"
  }
];

const BillingHistory = () => {
  const { user } = useAuth();
  const { currentPlan, cancelSubscription, isProcessingPayment } = useSubscription();
  
  if (!user) return null;
  
  return (
    <DashboardLayout>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-2xl font-bold mb-6">Faturamento</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pagamentos</CardTitle>
                <CardDescription>Histórico de suas faturas e pagamentos</CardDescription>
              </CardHeader>
              <CardContent>
                {mockInvoices.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fatura</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell>{invoice.id}</TableCell>
                          <TableCell>{invoice.date.toLocaleDateString('pt-BR')}</TableCell>
                          <TableCell>R$ {invoice.amount},00</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {invoice.status === 'paid' ? 'Pago' : 'Pendente'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon">
                              <FileDown className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Nenhuma fatura encontrada.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
                <CardDescription>Seu cartão registrado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <CreditCard className="h-6 w-6 text-gray-500" />
                  <div>
                    <p className="font-medium">Visa •••• 4242</p>
                    <p className="text-sm text-gray-500">Expira em 12/25</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Atualizar método de pagamento
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {user.subscriptionStatus === "active" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-red-600">Cancelar Assinatura</CardTitle>
                  <CardDescription>
                    Cuidado, esta ação não pode ser desfeita
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-4">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-red-700">
                        <p>Ao cancelar sua assinatura:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Você perderá acesso aos recursos premium</li>
                          <li>Seu acesso continuará até o fim do período pago atual</li>
                          <li>Você pode reativar sua assinatura a qualquer momento</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                    onClick={cancelSubscription}
                    disabled={isProcessingPayment}
                  >
                    {isProcessingPayment ? "Processando..." : "Cancelar assinatura"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BillingHistory;
