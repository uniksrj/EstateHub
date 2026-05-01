// /components/agent/DeadlineStatusBadge.jsx
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

export const DeadlineStatusBadge = ({ status }) => {
  const config = {
    on_track: {
      variant: 'default',
      icon: CheckCircle,
      label: 'On Track',
      className: 'bg-green-100 text-green-800 hover:bg-green-100'
    },
    extended: {
      variant: 'secondary',
      icon: Clock,
      label: 'Extended',
      className: 'bg-amber-100 text-amber-800 hover:bg-amber-100'
    },
    missed: {
      variant: 'destructive',
      icon: AlertCircle,
      label: 'Missed',
      className: 'bg-red-100 text-red-800 hover:bg-red-100'
    }
  };

  const { variant, icon: Icon, label, className } = config[status] || config.on_track;

  return (
    <Badge variant={variant} className={`gap-1 ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  );
};