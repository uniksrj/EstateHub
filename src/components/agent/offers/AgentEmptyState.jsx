import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useNavigate } from "react-router";

// components/agent/AgentEmptyState.jsx
export const AgentEmptyState = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-card rounded-xl shadow-lg border border-border p-12 text-center">
            <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-card-foreground mb-2">
                No offers received
            </h3>
            <p className="text-muted-foreground mb-6">
                Offers from buyers will appear here once they start making offers on your properties.
            </p>
            <Button onClick={() => navigate('/agent/properties')}>
                Manage Properties
            </Button>
        </div>
    );
};