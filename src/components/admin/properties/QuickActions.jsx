// components/properties/QuickActions.jsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Calendar, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router';

const QuickActions = () => {
  const navigate = useNavigate();
  const actions = [
    {
      icon: Eye,
      label: 'View All Properties',
      onClick: () => navigate('/properties'),
    },
    {
      icon: Calendar,
      label: 'Browse & Schedule',
      onClick: () => navigate('/properties'),
      variant: 'outline',
    },
    {
      icon: Users,
      label: 'Manage Users',
      onClick: () => navigate('/dashboard/users'),
      variant: 'outline',
    },
    {
      icon: DollarSign,
      label: 'Financial Reports',
      onClick: () => navigate('/dashboard/finance'),
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
