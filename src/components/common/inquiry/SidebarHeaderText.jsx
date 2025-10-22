import { Badge } from "@/components/ui/badge";
import { CardDescription, CardTitle } from "@/components/ui/card";

export const SidebarHeaderText = ({selectedInquiry}) => {
    return (
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl">{selectedInquiry.buyerName}</CardTitle>
                <CardDescription className="text-base">
                    Inquiry about {selectedInquiry.propertyTitle}
                </CardDescription>
            </div>
            <Badge variant={
                selectedInquiry.status === 'new' ? 'default' :
                    selectedInquiry.status === 'responded' ? 'secondary' : 'outline'
            }>
                {selectedInquiry.status}
            </Badge>
        </div>
    );
}