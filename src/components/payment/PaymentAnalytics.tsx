
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, DollarSign, Users, CreditCard, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PaymentAnalytics {
  period: {
    start: string;
    end: string;
  };
  overview: {
    totalPayments: number;
    successfulPayments: number;
    failedPayments: number;
    successRate: number;
    totalAmount: number;
    currency: string;
  };
  paymentMethods: Record<string, number>;
  refunds: {
    count: number;
    amount: number;
  };
}

const PaymentAnalytics = () => {
  const [analytics, setAnalytics] = useState<PaymentAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Format currency
  const formatCurrency = (amount: number, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Fetch analytics data
  const fetchAnalytics = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Set date range to last 30 days
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);
      
      const { data, error } = await supabase.functions.invoke('payment-analytics', {
        body: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setAnalytics(data);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load payment analytics');
      toast.error('Failed to load payment analytics');
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (isLoading && !analytics) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p>Loading payment analytics...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !analytics) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center items-center h-64">
          <div className="flex flex-col items-center text-center">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-4" />
            <p className="mb-4">{error}</p>
            <Button variant="outline" onClick={fetchAnalytics} size="sm">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Payment Analytics</span>
          <Button 
            variant="gradient" 
            size="sm" 
            onClick={fetchAnalytics} 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>
          Data from {new Date(analytics.period.start).toLocaleDateString()} to {new Date(analytics.period.end).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium">Total Revenue</h3>
            </div>
            <p className="text-2xl font-bold">
              {formatCurrency(analytics.overview.totalAmount, analytics.overview.currency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              After refunds: {formatCurrency(analytics.overview.totalAmount - analytics.refunds.amount)}
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium">Transactions</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.overview.totalPayments}</p>
            <p className="text-xs text-gray-500 mt-1">
              Success rate: {analytics.overview.successRate.toFixed(1)}%
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <CreditCard className="h-5 w-5 text-purple-500 mr-2" />
              <h3 className="text-sm font-medium">Refunds</h3>
            </div>
            <p className="text-2xl font-bold">{analytics.refunds.count}</p>
            <p className="text-xs text-gray-500 mt-1">
              Amount: {formatCurrency(analytics.refunds.amount)}
            </p>
          </div>
        </div>
        
        <h3 className="font-medium mb-3">Payment Methods</h3>
        <div className="space-y-3">
          {Object.entries(analytics.paymentMethods).map(([method, count]) => (
            <div key={method} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                <span className="capitalize">{method.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{count}</span>
                <span className="text-xs text-gray-500">
                  ({((count / analytics.overview.totalPayments) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentAnalytics;
