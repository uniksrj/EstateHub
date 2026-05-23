import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { statusConfig } from "@/config/miscConfig";
import { formatDate } from "@/lib/utils";
import { formatCurrency } from "@/utils/userHelpers";
import { Loading } from "@/pages/misc/Loading";
import { Star } from "lucide-react";

export const InquiryList = ({loading , filteredInquiries, setSelectedInquiry ,selectedInquiry , enableActions, toggleImportant}) => {
    console.log("inquiry List :",filteredInquiries);
    
    return (
        <div className="lg:col-span-2 space-y-4">
            {loading ? (
               <Loading loading={loading} isLineLoader={true} />
            ) : (
                <>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">
                            {filteredInquiries.length} Inquiry{filteredInquiries.length !== 1 ? 'ies' : ''}
                        </h2>
                    </div>

                    {filteredInquiries.map((inquiry) => (
                        <Card
                            key={inquiry.id}
                            className={`cursor-pointer hover:shadow-md transition-shadow ${selectedInquiry?.id === inquiry.id ? 'border-primary border-2' : ''
                                } ${inquiry.status == 0 ? 'bg-blue-50/50' : ''}`}
                            onClick={() => setSelectedInquiry(inquiry)}
                        >
                            <CardContent className="p-4">
                                {/* Your existing card content */}
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="font-semibold">{inquiry.buyerName}</h3>
                                            <Badge variant={statusConfig[inquiry?.status]?.variant}
                                                    className={statusConfig[inquiry?.status]?.color}
                                            >
                                                {statusConfig[inquiry?.status]?.label}
                                            </Badge>
                                            {inquiry.important && (
                                                <Badge variant="default" className="bg-amber-500">
                                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                                    Important
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-2">
                                            Interested in: <strong>{inquiry.propertyTitle}</strong>
                                        </p>

                                        <p className="text-sm line-clamp-2 mb-3 text-foreground">
                                            {inquiry.message}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Budget: {formatCurrency(parseInt(inquiry.budget_min))} - {formatCurrency(parseInt(inquiry.budget_max))}</span>
                                            <span>{formatDate(inquiry.createdAt)}</span>
                                        </div>
                                    </div>

                                    {enableActions && (
                                        <div className="flex gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => toggleImportant(inquiry.id, inquiry.important)}
                                            >
                                                <Star className={`h-4 w-4 ${inquiry.important ? 'fill-amber-500 text-amber-500' : ''}`} />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </>
            )}
        </div>
    );
}
