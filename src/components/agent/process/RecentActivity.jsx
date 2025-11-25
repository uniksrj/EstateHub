import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { activities } from "@/data/demoData";
import ActivityItem from "./ActivityItem";
import { AlertCircle } from "lucide-react";

const RecentActivity = ({ dealId }) => {

  const groupActivitiesByDate = (activities) => {
    const groups = {
      today: [],
      yesterday: [],
      this_week: [],
      older: []
    };

    activities.forEach(activity => {
      // This is simplified - you'd use actual date comparison logic
      if (activity.time.includes('hour') || activity.time.includes('minutes')) {
        groups.today.push(activity);
      } else if (activity.time.includes('day') && parseInt(activity.time) <= 1) {
        groups.yesterday.push(activity);
      } else if (activity.time.includes('day') && parseInt(activity.time) <= 7) {
        groups.this_week.push(activity);
      } else {
        groups.older.push(activity);
      }
    });

    return groups;
  };

  const activityGroups = groupActivitiesByDate(activities);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Activity</CardTitle>
        <CardDescription>Recent updates and required actions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Urgent Activities First */}
        {activities.filter(a => a.status === 'urgent').length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-red-600 flex items-center gap-2">
              <AlertCircle className="size-4" />
              Action Required
            </h4>
            {activities
              .filter(activity => activity.status === 'urgent')
              .map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))
            }
          </div>
        )}

        {/* Today's Activities */}
        {activityGroups.today.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Today</h4>
            {activityGroups.today.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {/* Yesterday's Activities */}
        {activityGroups.yesterday.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Yesterday</h4>
            {activityGroups.yesterday.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {/* This Week */}
        {activityGroups.this_week.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">This Week</h4>
            {activityGroups.this_week.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        <Button variant="outline" className="w-full">
          View Complete Activity Log
        </Button>
      </CardContent>
    </Card>
  );
};


export default RecentActivity;