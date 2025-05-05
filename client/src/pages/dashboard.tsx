import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, DollarSign, TrendingUp, Calendar, AlertCircle, ChevronRight } from "lucide-react";
import InvestmentPlans from "@/components/sections/investment-plans";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button variant="outline" onClick={() => window.location.href = "/profile"}>
            Edit Profile <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Active Investments Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-primary mr-2" />
                <span className="text-3xl font-bold">0</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                You don't have any active investments yet.
              </p>
            </CardContent>
          </Card>
          
          {/* Total Returns Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Total Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-3xl font-bold">$0.00</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Start investing to see your returns grow.
              </p>
            </CardContent>
          </Card>
          
          {/* Investment Duration Card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">Investment Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-3xl font-bold">0 days</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Duration of your investment journey.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>
                  Welcome to your Bitcoin investment dashboard. Here's how to get started.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">You haven't made any investments yet.</p>
                  </div>
                  <p className="text-sm text-yellow-700 mt-2">
                    Start your investment journey by choosing a plan below that matches your goals and risk tolerance.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Complete Your Profile</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Provide additional information about your investment preferences and goals.
                      </p>
                      <Button variant="link" className="px-0 h-8" onClick={() => window.location.href = "/profile"}>
                        Update Profile
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Choose an Investment Plan</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Select from our range of investment plans based on your risk tolerance and goals.
                      </p>
                      <Button variant="link" className="px-0 h-8" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
                        View Plans
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <span className="font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Monitor Your Investments</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Track the performance of your investments and watch your returns grow over time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>My Investments</CardTitle>
                <CardDescription>
                  View and manage your active investment portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No active investments</h3>
                  <p className="text-gray-600 mb-6">
                    You haven't made any investments yet. Start by choosing a plan below.
                  </p>
                  <Button onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
                    View Investment Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  A record of all your investment transactions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                  <p className="text-gray-600">
                    Your transaction history will appear here once you start investing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Available Investment Plans */}
        <InvestmentPlans />
      </div>
    </div>
  );
}