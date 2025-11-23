import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, Calendar, User } from "lucide-react";
import { getAgentStatusInfo, getDaysUntilDeadline } from "@/utils/userHelpers";
import { useState } from "react";
import { DealManagementModal } from "./DealManagementModal";
import { Loading } from "@/pages/misc/Loading";

const DealPipeline = ({ deals, loading }) => {
  const [dealManagement, setDealManagement] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);

  const getPriorityColor = (priority) => {
    return priority === "high" ? "destructive" : "secondary";
  };

  const handleManageDeal = (dealID) => {
    let filterData = deals.find(val => Number(val.id) === Number(dealID));
    console.log("Getting filterData DATA :", filterData)
    setSelectedDeal(filterData);
    setDealManagement(true);
  };

  if (loading) {
    return <Loading loading={loading} />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Deal Pipeline</CardTitle>
        <CardDescription>Properties under contract - manage next steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deals.map((deal) => {
          const statusInfo = getAgentStatusInfo(deal.status);
          const StatusIcon = statusInfo.icon;
          const daysUntilDeadline = getDaysUntilDeadline(deal.deadline);
          const isUrgent = daysUntilDeadline <= 2;
          return (
            <div key={deal.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-muted-foreground" />
                    <h4 className="font-semibold text-lg">{deal.address}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>Buyer: {deal.buyer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>Seller: {deal.seller}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">{deal.price}</div>
                  <div className="text-xs text-muted-foreground">
                    Accepted: {new Date(deal.acceptedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Status and Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusInfo.color}>
                    <StatusIcon className="size-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                  <Badge variant={getPriorityColor(deal.priority)}>
                    {deal.priority} priority
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{deal.progress}%</span>
                  </div>
                  <Progress value={deal.progress} className="h-2" />
                </div>
              </div>

              {/* Next Steps and Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Calendar className={`size-4 ${isUrgent ? 'text-red-500' : 'text-amber-500'}`} />
                    Next: {deal.nextStep}
                  </p>
                  <p className={`text-xs ${isUrgent ? 'text-red-600 font-medium' : 'text-muted-foreground'}`}>
                    {isUrgent ? '⚠️ ' : ''}Deadline: {new Date(deal.deadline).toLocaleDateString()}
                    ({daysUntilDeadline} {daysUntilDeadline === 1 ? 'day' : 'days'})
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleManageDeal(deal.id)}>
                    Manage
                  </Button>
                  <Button size="sm">
                    Update
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            View All Deals
          </Button>
          <Button className="flex-1">
            Add New Deal
          </Button>
        </div>
        {dealManagement && (
          <DealManagementModal
            isOpen={!!selectedDeal}
            onClose={() => setSelectedDeal(null)}
            deal={selectedDeal}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DealPipeline;