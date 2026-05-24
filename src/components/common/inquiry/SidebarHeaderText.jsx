import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { statusConfig } from "@/config/miscConfig";

export const SidebarHeaderText = ({ selectedInquiry }) => {    
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
                <CardTitle className="truncate text-lg sm:text-xl">{selectedInquiry.buyerName}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2 text-sm sm:text-base">
                    Inquiry about {selectedInquiry.propertyTitle}
                </CardDescription>
            </div>
            <Badge
                variant={statusConfig[selectedInquiry.status]?.variant}
                className={`w-fit shrink-0 ${statusConfig[selectedInquiry.status]?.color || ''}`}
            >
                {statusConfig[selectedInquiry.status]?.label}
            </Badge>
        </div >
    );
}
