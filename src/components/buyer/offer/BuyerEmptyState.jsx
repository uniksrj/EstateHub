// components/buyer/BuyerEmptyState.jsx

import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router";
export const BuyerEmptyState = ({ onBrowseProperties }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-xl shadow-lg border border-border p-12 text-center">
      <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
      <h3 className="text-xl font-medium text-card-foreground mb-2">
        No offers yet
      </h3>
      <p className="text-muted-foreground mb-6">
        Start by exploring properties and making your first offer!
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={onBrowseProperties}>
          Browse Properties
        </Button>
        <Button variant="outline" onClick={() => navigate('/buyer/favorites')}>
          View Saved Properties
        </Button>
      </div>
    </div>
  );
};
