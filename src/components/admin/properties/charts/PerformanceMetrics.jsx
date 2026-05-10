// components/properties/PerformanceMetrics.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PerformanceMetrics = ({ data }) => {
  console.log("performance data :",data);
  
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Key Performance Indicators</CardTitle>
        <CardDescription>Critical metrics for property management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium text-foreground">{metric.metric}</p>
                <p className="text-sm text-muted-foreground">
                  Current: {typeof metric.current === 'number' ? metric.current.toFixed(1) : metric.current}
                </p>
              </div>
              <Badge 
                variant={metric.change >= 0 ? "default" : "destructive"}
                className={metric.change >= 0 ? "bg-green-500" : ""}
              >
                {metric.change >= 0 ? '+' : ''}{metric.change}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;