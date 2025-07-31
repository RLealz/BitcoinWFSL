import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Coins, CheckCircle, Shield, TrendingUp, AlertCircle, Bitcoin, Building, Cpu } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InvestmentPlan } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { sampleInvestmentPlans } from "@/data/sample-investment-plans";

export default function InvestmentPlans() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("crypto");

  // Fetch investment plans from the API with fallback to sample data
  const { data: apiPlans, isLoading, isError } = useQuery<InvestmentPlan[]>({
    queryKey: ["/api/investment-plans"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Use sample data if API fails or returns empty data
  const plans = apiPlans && apiPlans.length > 0 ? apiPlans : sampleInvestmentPlans as InvestmentPlan[];

  // Function to handle plan selection
  const handlePlanSelection = (planId: number) => {
    setSelectedPlan(planId);
    
    // If user is not logged in, show a toast to prompt login
    toast({
      title: "Authentication Required",
      description: "Please log in or register to invest in this plan.",
      variant: "default",
      action: (
        <Button variant="outline" size="sm" onClick={() => window.location.href = "/auth"}>
          Login / Register
        </Button>
      ),
    });
  };

  // Function to get risk level badge color
  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return "bg-green-100 text-green-800";
      case 'medium':
        return "bg-yellow-100 text-yellow-800";
      case 'high':
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Function to get fund type icon
  const getFundTypeIcon = (fundType: string) => {
    switch (fundType) {
      case 'crypto':
        return <Bitcoin className="h-5 w-5" />;
      case 'real-estate':
        return <Building className="h-5 w-5" />;
      case 'emerging-tech':
        return <Cpu className="h-5 w-5" />;
      default:
        return <Coins className="h-5 w-5" />;
    }
  };

  // Filter plans by fund type
  const filterPlansByType = (fundType: string) => {
    if (!plans) return [];
    return plans.filter(plan => {
      const planFundType = (plan as any).fundType || 'crypto';
      return planFundType === fundType;
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Loading investment options...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="shadow-lg">
                <CardHeader>
                  <Skeleton className="h-8 w-2/3 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state only if both API and sample data fail
  if (isError && (!plans || plans.length === 0)) {
    return (
      <section id="plans" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
            <div className="flex items-center justify-center gap-2 text-red-500">
              <AlertCircle size={20} />
              <p>Unable to load investment plans. Please try again later.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Planos de Investimento</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Escolha o fundo de investimento que combina com seus objetivos financeiros e tolerância ao risco. 
            Nossas opções diversificadas oferecem diferentes retornos baseados em duração e nível de risco.
          </p>
        </div>
        
        {/* Investment Fund Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="crypto" className="flex items-center gap-2">
              <Bitcoin className="h-4 w-4" />
              Cripto-ativos
            </TabsTrigger>
            <TabsTrigger value="real-estate" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Imobiliário
            </TabsTrigger>
            <TabsTrigger value="emerging-tech" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Tecnologias Emergentes
            </TabsTrigger>
          </TabsList>

          {/* Crypto-assets Tab */}
          <TabsContent value="crypto">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Fundo de Investimento de Cripto-ativos</h3>
              <p className="text-gray-600">
                Invista em uma carteira diversificada de criptomoedas com estratégias de baixo a alto risco.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filterPlansByType('crypto').map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                    selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <CardTitle className="text-xl font-bold flex items-center gap-2">
                        {getFundTypeIcon('crypto')}
                        {plan.name}
                      </CardTitle>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(plan.riskLevel)}`}>
                        {plan.riskLevel.charAt(0).toUpperCase() + plan.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                    <CardDescription>
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <span className="text-sm text-gray-600">Retorno Mensal:</span>
                      <span className="text-2xl font-bold text-primary">{plan.monthlyReturnRate}%</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-gray-500" />
                        <span className="text-sm">
                          Investimento Mín.: {formatCurrency(Number(plan.minimumInvestment))}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-gray-500" />
                        <span className="text-sm">
                          Duração: {plan.durationMonths} meses
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm">
                          Lucro Total: {(Number(plan.monthlyReturnRate) * plan.durationMonths).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handlePlanSelection(plan.id)}
                    >
                      Investir Agora <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Real Estate Tab */}
          <TabsContent value="real-estate">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Fundo de Investimento Imobiliário</h3>
              <p className="text-gray-600">
                Invista em propriedades comerciais e residenciais com retornos estáveis e crescimento a longo prazo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filterPlansByType('real-estate').length > 0 ? (
                filterPlansByType('real-estate').map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                      selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                          {getFundTypeIcon('real-estate')}
                          {plan.name}
                        </CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(plan.riskLevel)}`}>
                          {plan.riskLevel.charAt(0).toUpperCase() + plan.riskLevel.slice(1)} Risk
                        </span>
                      </div>
                      <CardDescription>
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b">
                        <span className="text-sm text-gray-600">Retorno Mensal:</span>
                        <span className="text-2xl font-bold text-primary">{plan.monthlyReturnRate}%</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">
                            Investimento Mín.: {formatCurrency(Number(plan.minimumInvestment))}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">
                            Duração: {plan.durationMonths} meses
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">
                            Lucro Total: {(Number(plan.monthlyReturnRate) * plan.durationMonths).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handlePlanSelection(plan.id)}
                      >
                        Investir Agora <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-600">Em Breve</h3>
                  <p className="text-gray-500">
                    Novos planos de investimento imobiliário estarão disponíveis em breve.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Emerging Technologies Tab */}
          <TabsContent value="emerging-tech">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2">Fundo de Investimento de Tecnologias Emergentes</h3>
              <p className="text-gray-600">
                Invista nas tecnologias do futuro: IA, blockchain, IoT e outras inovações disruptivas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filterPlansByType('emerging-tech').length > 0 ? (
                filterPlansByType('emerging-tech').map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                      selectedPlan === plan.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center mb-2">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                          {getFundTypeIcon('emerging-tech')}
                          {plan.name}
                        </CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${getRiskLevelColor(plan.riskLevel)}`}>
                          {plan.riskLevel.charAt(0).toUpperCase() + plan.riskLevel.slice(1)} Risk
                        </span>
                      </div>
                      <CardDescription>
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center pb-4 border-b">
                        <span className="text-sm text-gray-600">Retorno Mensal:</span>
                        <span className="text-2xl font-bold text-primary">{plan.monthlyReturnRate}%</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Coins className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">
                            Investimento Mín.: {formatCurrency(Number(plan.minimumInvestment))}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-gray-500" />
                          <span className="text-sm">
                            Duração: {plan.durationMonths} meses
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm">
                            Lucro Total: {(Number(plan.monthlyReturnRate) * plan.durationMonths).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handlePlanSelection(plan.id)}
                      >
                        Investir Agora <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <Cpu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-gray-600">Em Breve</h3>
                  <p className="text-gray-500">
                    Novos planos de investimento em tecnologias emergentes estarão disponíveis em breve.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Risk Notice */}
        <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-amber-500 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-800">Investment Risk Disclosure</h3>
              <p className="text-sm text-amber-700 mt-1">
                All investments involve risk and may result in loss. Past performance is not indicative of future results.
                Please consider your financial situation and risk tolerance before investing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}