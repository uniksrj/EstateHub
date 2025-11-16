import { colorClasses } from "@/constants/offerTypes";

const StatCard = ({ value, label, color = "foreground" }) => {
       return (
        <div className="bg-card rounded-lg p-4 border border-border">
            <div className={`text-2xl font-bold ${colorClasses[color]}`}>
                {value}
            </div>
            <div className="text-sm text-muted-foreground">
                {label}
            </div>
        </div>
    );
}

export default StatCard;