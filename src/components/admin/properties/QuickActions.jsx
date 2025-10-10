// components/properties/QuickActions.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, Users, DollarSign } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Eye,
      label: 'View All Properties',
      onClick: () => console.log('View properties'),
    },
    {
      icon: Calendar,
      label: 'Schedule Tour',
      onClick: () => console.log('Schedule tour'),
      variant: 'outline',
    },
    {
      icon: Users,
      label: 'Manage Clients',
      onClick: () => console.log('Manage clients'),
      variant: 'outline',
    },
    {
      icon: DollarSign,
      label: 'Financial Reports',
      onClick: () => console.log('Financial reports'),
      variant: 'outline',
    },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Manage your properties efficiently</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'default'}
              className="h-20 flex flex-col gap-2"
              onClick={action.onClick}
            >
              <action.icon className="h-6 w-6" />
              <span>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;