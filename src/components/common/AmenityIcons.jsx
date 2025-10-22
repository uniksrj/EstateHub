import { 
  Car, 
  Wifi, 
  Shield, 
  Zap,
  Home,
  Warehouse,
  Snowflake,
  Flame,
  Dumbbell,
  Shirt,
  Trees
} from 'lucide-react';

const AmenityIcons = ({ property }) => {
    
  const amenityConfig = [
    { field: 'has_parking', icon: Car, label: 'Parking' },
    { field: 'has_security', icon: Shield, label: 'Security' },
    { field: 'has_air_conditioning', icon: Snowflake, label: 'A/C' },
    { field: 'has_heating', icon: Flame, label: 'Heating' },
    { field: 'has_pool', icon: Home, label: 'Pool' }, 
    { field: 'has_garden', icon: Trees, label: 'Garden' },
    { field: 'has_garage', icon: Warehouse, label: 'Garage' },
    { field: 'has_gym', icon: Dumbbell, label: 'Gym' },
    { field: 'has_laundry', icon: Shirt, label: 'Laundry' },
  ];

  const activeAmenities = amenityConfig.filter(({ field }) => property[field]);

  if (activeAmenities.length === 0){
    return <p className="text-sm text-muted-foreground">No amenities listed.</p>;
  }

  return (
    <div className="flex flex-wrap gap-3 mt-3">
      {activeAmenities.map(({ field, icon: Icon, label }) => (
        <div key={field} className="flex items-center gap-1 text-sm text-muted-foreground">
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default AmenityIcons;