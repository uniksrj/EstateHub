import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { statusConfig } from "@/config/miscConfig";

export const SidebarHeaderText = ({ selectedInquiry }) => {    
    return (
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">{selectedInquiry.buyerName}</CardTitle>
                <CardDescription className="text-base">
                    Inquiry about {selectedInquiry.propertyTitle}
                </CardDescription>
            </div>
            <Badge
                variant={statusConfig[selectedInquiry.status]?.variant}
                className={statusConfig[selectedInquiry.status]?.color}
            >
                {statusConfig[selectedInquiry.status]?.label}
            </Badge>
        </div >
    );
}