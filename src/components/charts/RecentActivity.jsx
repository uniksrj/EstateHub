// components/RecentActivity.jsx
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const activities = [
  {
    id: 1,
    deal: 'DD-2023-046',
    action: 'Marked as Dead',
    user: 'Sarah Johnson',
    time: '2 hours ago',
    type: 'negative'
  },
  {
    id: 2,
    deal: 'DD-2023-044',
    action: 'Recovered',
    user: 'Mike Chen',
    time: '5 hours ago',
    type: 'positive'
  },
  {
    id: 3,
    deal: 'DP-2023-128',
    action: 'New Deal Added',
    user: 'Emily Rodriguez',
    time: '1 day ago',
    type: 'positive'
  },
  {
    id: 4,
    deal: 'DD-2023-042',
    action: 'Analysis Completed',
    user: 'David Kim',
    time: '2 days ago',
    type: 'neutral'
  }
];

const RecentActivity = ({activities}) => {

  const getVariant = (type) => {
    switch (type) {
      case 'positive': return 'default';
      case 'negative': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Latest updates across all deals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{activity.user}</span>
                  <Badge variant={getVariant(activity.type)}>
                    {activity.action}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  Deal: {activity.deal} • {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;