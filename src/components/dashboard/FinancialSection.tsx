import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  DollarSign,
  ArrowDownRight,
  AlertCircle,
} from "lucide-react";

interface FinancialMetric {
  label: string;
  amount: number;
  change: number;
  trend: "up" | "down";
}

interface FinancialSectionProps {
  monthlyRevenue?: FinancialMetric;
  outstandingPayments?: FinancialMetric;
  expenses?: FinancialMetric;
  collectionRate?: number;
}

const FinancialSection = ({
  monthlyRevenue = {
    label: "Monthly Revenue",
    amount: 52500,
    change: 12.5,
    trend: "up",
  },
  outstandingPayments = {
    label: "Outstanding Payments",
    amount: 8750,
    change: 2.3,
    trend: "down",
  },
  expenses = {
    label: "Monthly Expenses",
    amount: 12300,
    change: 5.2,
    trend: "up",
  },
  collectionRate = 92,
}: FinancialSectionProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const MetricCard = ({ metric }: { metric: FinancialMetric }) => {
    return (
      <Card className="bg-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            {metric.trend === "up" ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
          </div>
          <div className="mt-2">
            <h2 className="text-2xl font-bold">
              {formatCurrency(metric.amount)}
            </h2>
            <p
              className={`text-sm ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
            >
              {metric.trend === "up" ? "+" : "-"}
              {Math.abs(metric.change)}% from last month
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-4 bg-gray-50 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <Button variant="outline">
          <DollarSign className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard metric={monthlyRevenue} />
        <MetricCard metric={outstandingPayments} />
        <MetricCard metric={expenses} />
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Rent Collection Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Current Month
              </span>
              <span className="font-medium">{collectionRate}%</span>
            </div>
            <Progress value={collectionRate} className="h-2" />
            {collectionRate < 90 && (
              <div className="flex items-center gap-2 text-sm text-amber-600 mt-2">
                <AlertCircle className="h-4 w-4" />
                <span>Collection rate below target (90%)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialSection;
