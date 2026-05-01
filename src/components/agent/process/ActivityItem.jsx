import { Badge } from "@/components/ui/badge";
import { getStatusBadge, getTypeColor, getTypeIcon } from "@/utils/userHelpers";
import { Home, User } from "lucide-react";

const ActivityItem = ({ activity }) => {
  const statusInfo = getStatusBadge(activity.status);
  const ActivityIcon = getTypeIcon(activity.type);
  const iconColor = getTypeColor(activity.type);

  return (
    <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors group">
      <div className={`p-2 rounded-full ${iconColor} bg-opacity-10 flex-shrink-0`}>
        <ActivityIcon className={`size-4 ${iconColor}`} />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium leading-tight flex-1">
            {activity.message}
          </p>
          <Badge variant={statusInfo.variant} className="text-xs flex-shrink-0">
            {statusInfo.label}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <Home className="size-3" />
          <span>{activity.property}</span>
          <span>•</span>
          <User className="size-3" />
          <span>{activity.user}</span>
          <span>•</span>
          <span>{activity.time}</span>
        </div>

        {/* Additional context */}
        <div className="text-xs text-muted-foreground">
          {activity.action} • {activity.step.replace('_', ' ')}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;