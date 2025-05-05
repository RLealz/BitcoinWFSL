import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Coins, CheckCircle, Shield, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvestmentPlan } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

export default function InvestmentPlans() {
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  // Fetch investment plans from the API
  const { data: plans, isLoading, isError } = useQuery<InvestmentPlan[]>({
    queryKey: ["/api/investment-plans"],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

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

  // Show error state
  if (isError || !plans) {
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
          <h2 className="text-3xl font-bold mb-4">Investment Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the investment plan that matches your financial goals and risk tolerance. 
            Our diversified options offer various returns based on duration and risk level.
          </p>
        </div>
        
        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`shadow-lg transition-all duration-300 hover:shadow-xl ${
                selectedPlan === plan.id ? "ring-2 ring-primary" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
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
                  <span className="text-sm text-gray-600">Monthly Return:</span>
                  <span className="text-2xl font-bold text-primary">{plan.monthlyReturnRate}%</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">
                      Min. Investment: {formatCurrency(Number(plan.minimumInvestment))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-gray-500" />
                    <span className="text-sm">
                      Duration: {plan.durationMonths} months
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">
                      Total Profit: {(Number(plan.monthlyReturnRate) * plan.durationMonths).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handlePlanSelection(plan.id)}
                >
                  Invest Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
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