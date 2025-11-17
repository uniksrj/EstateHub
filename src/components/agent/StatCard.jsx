import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ title, value, subtitle, Icon, iconColor = "text-muted-foreground", trend = "neutral" }) => {
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  }[trend];

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500"
  }[trend];

  return (
    <Card className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="flex items-center gap-1">
          {Icon && <Icon className={`size-4 ${iconColor}`} />}
          <TrendIcon className={`size-3 ${trendColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </CardContent>
      
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
    </Card>
  );
};

export default StatCard;