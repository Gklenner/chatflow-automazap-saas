
import { useParams, Link } from "react-router-dom";
import { useBots } from "@/context/BotContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart2, MessageSquare, Users, Clock } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from "recharts";

const BotAnalytics = () => {
  const { botId } = useParams();
  const { getBot, getBotAnalytics } = useBots();
  
  const bot = botId ? getBot(botId) : undefined;
  const analytics = botId ? getBotAnalytics(botId) : undefined;
  
  if (!bot || !analytics) {
    return (
      <div className="p-8">
        <Link to="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
          </Button>
        </Link>
        <div className="mt-4">Bot não encontrado ou sem dados analíticos</div>
      </div>
    );
  }
  
  // Prepare data for charts
  const messageData = analytics.dailyStats.map(stat => ({
    date: stat.date,
    "Mensagens": stat.messageCount,
    "Usuários": stat.userCount
  }));
  
  const topQuestionsData = analytics.topQuestions.map(q => ({
    question: q.question.length > 20 ? q.question.substring(0, 20) + '...' : q.question,
    count: q.count
  }));
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Link to={`/bot/details/${botId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" /> Voltar para o bot
          </Button>
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{bot.name} - Análises</h1>
        <p className="text-gray-600">Estatísticas e desempenho do bot</p>
      </div>
      
      {/* Metrics summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 bg-automazap-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-automazap-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de mensagens</p>
              <p className="text-2xl font-bold">{bot.stats.messages}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de usuários</p>
              <p className="text-2xl font-bold">{bot.stats.users}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo de resposta</p>
              <p className="text-2xl font-bold">{analytics.averageResponseTime.toFixed(1)}s</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Satisfação</p>
              <p className="text-2xl font-bold">{analytics.userSatisfaction.toFixed(1)}/5</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Message and user trends */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tendências de Mensagens e Usuários</CardTitle>
          <CardDescription>Atividades diárias nas últimas semanas</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={messageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Mensagens" stroke="#3182ce" strokeWidth={2} />
              <Line type="monotone" dataKey="Usuários" stroke="#38a169" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Top questions */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas mais frequentes</CardTitle>
          <CardDescription>As perguntas mais feitas aos seus bots</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topQuestionsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="question" width={150} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#805ad5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default BotAnalytics;
