import { Calendar, Mail, Phone, User } from "lucide-react";
import { formatCurrency } from "@/utils/userHelpers";

export const BuyerInfo = ({selectedInquiry}) => {
    return (
        <div>
            <h4 className="font-semibold mb-3 text-lg border-b pb-2">Buyer Information</h4>
            <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Name:</strong> {selectedInquiry.buyerName}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Email:</strong> {selectedInquiry.buyerEmail}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Phone:</strong> {selectedInquiry.buyerPhone}</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span><strong>Timeline:</strong> {selectedInquiry.timeline}</span>
                </div>
                <div className="p-2 bg-muted rounded-lg">
                    <strong>Budget Range:</strong> {formatCurrency(parseInt(selectedInquiry.budget_min))} - {formatCurrency(parseInt(selectedInquiry.budget_max))}
                </div>
            </div>
        </div>
    );
}
