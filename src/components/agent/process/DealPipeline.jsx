import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, Calendar, User } from "lucide-react";
import { getAgentStatusInfo, getDaysUntilDeadline } from "@/utils/userHelpers";
import { useMemo, useState } from "react";
import { DealManagementModal } from "./DealManagementModal";
import { Loading } from "@/pages/misc/Loading";
import { DealUpdateModal } from "./DealUpdateModal";
import { Tooltip } from "recharts";

const DealPipeline = ({ deals, loading, setActiveDeals }) => {
  const [selectedDealId, setSelectedDealId] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [manageModalOpen, setManageModalOpen] = useState(false);
  const getPriorityColor = (priority) => {
    return priority === "high" ? "destructive" : "secondary";
  };

  const selectedDeal = useMemo(
    () => deals.find(d => Number(d.id) === Number(selectedDealId)),
    [deals, selectedDealId]
  );

  const handleManageDeal = (dealId) => {
    setSelectedDealId(Number(dealId));
    setManageModalOpen(true);
    setUpdateModalOpen(false);
  };

  const handleUpdateDeal = (dealId) => {
    setSelectedDealId(Number(dealId));
    setUpdateModalOpen(true);
    setManageModalOpen(false);
  };

  const handleCloseManageModal = () => {
    setManageModalOpen(false);
    setSelectedDealId(null);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedDealId(null);
  };

  if (loading) {
    return <Loading loading={loading} />
  }
  console.log("Rendering DealPipeline with deals:", deals);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Deal Pipeline</CardTitle>
        <CardDescription>Properties under contract - manage next steps</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {deals?.map((deal) => {
          const statusInfo = getAgentStatusInfo(deal?.status);
          const StatusIcon = statusInfo.icon;
          const daysUntilDeadline = getDaysUntilDeadline(deal?.deadline);
          const isUrgent = daysUntilDeadline <= 2;
          return (
            <div key={deal?.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Home className="size-4 text-muted-foreground" />
                    <h4 className="font-semibold text-lg">{deal?.address}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>Buyer: {deal?.buyer}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="size-3" />
                      <span>Seller: {deal?.seller}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">{deal?.price}</div>
                  <div className="text-xs text-muted-foreground">
                    Accepted: {new Date(deal?.acceptedDate).toLocaleDateString()}
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
                  <Badge variant={getPriorityColor(deal?.priority)}>
                    {deal?.priority} priority
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{deal?.progress ?? 0}%</span>
                  </div>
                  <Progress value={deal?.progress ?? 0} className="h-2" />
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
                    {isUrgent ? '⚠️ ' : ''}Deadline: {new Date(deal?.deadline).toLocaleDateString()}
                    ({daysUntilDeadline} {daysUntilDeadline === 1 ? 'day' : 'days'})
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleManageDeal(deal?.id)}>
                    Manage
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateDeal(deal?.id)}
                    disabled={deal.deadline_status === 'missed'}
                    className={deal.deadline_status === 'missed' ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    Update
                    {deal.deadline_status === 'missed' && (
                      <Tooltip>
                        <span className="ml-1 text-xs">⚠️ Deadline missed - Use Manage</span>
                      </Tooltip>
                    )}
                  </Button>
                </div>
              </div>
              {deal.loan_application && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Mortgage: {deal.loan_application.status}
                </Badge>
              )}
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
        {manageModalOpen && (<DealManagementModal
          isOpen={manageModalOpen}
          onClose={handleCloseManageModal}
          deal={selectedDeal}
          onUpdate={setActiveDeals} />)}

        {/* Update Modal */}
        {updateModalOpen && (
          <DealUpdateModal
            isOpen={updateModalOpen}
            onClose={handleCloseUpdateModal}
            deal={selectedDeal}
            onUpdate={setActiveDeals}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DealPipeline;