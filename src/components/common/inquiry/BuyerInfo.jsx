import { Calendar, Mail, Phone, User } from "lucide-react";
import { formatCurrency } from "@/utils/userHelpers";

export const BuyerInfo = ({selectedInquiry}) => {
    return (
        <div>
            <h4 className="mb-3 border-b pb-2 text-base font-semibold sm:text-lg">Buyer Information</h4>
            <div className="divide-y text-sm">
                <div className="flex min-w-0 items-start gap-2 py-2.5">
                    <User className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-words"><strong>Name:</strong> {selectedInquiry.buyerName}</span>
                </div>
                <div className="flex min-w-0 items-start gap-2 py-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-all"><strong>Email:</strong> {selectedInquiry.buyerEmail}</span>
                </div>
                <div className="flex min-w-0 items-start gap-2 py-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-words"><strong>Phone:</strong> {selectedInquiry.buyerPhone}</span>
                </div>
                <div className="flex min-w-0 items-start gap-2 py-2.5">
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 break-words"><strong>Timeline:</strong> {selectedInquiry.timeline}</span>
                </div>
                <div className="min-w-0 py-2.5">
                    <strong>Budget Range:</strong> {formatCurrency(parseInt(selectedInquiry.budget_min))} - {formatCurrency(parseInt(selectedInquiry.budget_max))}
                </div>
            </div>
        </div>
    );
}
