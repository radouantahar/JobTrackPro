import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { MarketInsight, generateMarketInsights } from "@/lib/market-insights";

const MarketInsights = () => {
  const [insights, setInsights] = React.useState<MarketInsight[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchInsights = async () => {
      const data = await generateMarketInsights([]);
      setInsights(data);
      setLoading(false);
    };

    fetchInsights();
  }, []);

  const getTrendIcon = (trend: MarketInsight["trend"]) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return <div>Loading insights...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {insights.map((insight, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium flex items-center gap-2">
                {getTrendIcon(insight.trend)}
                {insight.title}
              </h4>
              {insight.percentage && (
                <span className="text-sm font-medium">
                  {insight.percentage}%
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{insight.description}</p>
            {insight.percentage && (
              <Progress value={insight.percentage} className="h-1" />
            )}
            {insight.recommendation && (
              <div className="flex items-center gap-1 text-sm text-primary">
                <ArrowRight className="h-4 w-4" />
                {insight.recommendation}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
