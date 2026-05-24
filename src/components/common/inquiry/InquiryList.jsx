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
        <div className="min-w-0 space-y-4">
            {loading ? (
               <Loading loading={loading} isLineLoader={true} />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold sm:text-lg">
                            {filteredInquiries.length} Inquiry{filteredInquiries.length !== 1 ? 'ies' : ''}
                        </h2>
                    </div>

                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
                        {filteredInquiries.map((inquiry) => (
                            <Card
                                key={inquiry.id}
                                className={`cursor-pointer overflow-hidden shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${selectedInquiry?.id === inquiry.id ? 'border-primary ring-2 ring-primary/15' : ''
                                    } ${Number(inquiry.status) === 0 ? 'bg-blue-50/70 dark:bg-blue-950/20' : ''}`}
                                onClick={() => setSelectedInquiry(inquiry)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <h3 className="min-w-0 truncate font-semibold">{inquiry.buyerName}</h3>
                                                <Badge variant={statusConfig[inquiry?.status]?.variant}
                                                        className={statusConfig[inquiry?.status]?.color}
                                                >
                                                    {statusConfig[inquiry?.status]?.label}
                                                </Badge>
                                                {inquiry.important && (
                                                    <Badge variant="default" className="bg-amber-500">
                                                        <Star className="mr-1 h-3 w-3 fill-current" />
                                                        Important
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="mb-2 min-w-0 text-sm text-muted-foreground">
                                                Interested in: <strong className="text-foreground">{inquiry.propertyTitle}</strong>
                                            </p>

                                            <p className="mb-3 line-clamp-2 text-sm text-foreground">
                                                {inquiry.message}
                                            </p>

                                            <div className="flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                                                <span className="min-w-0 truncate">Budget: {formatCurrency(parseInt(inquiry.budget_min))} - {formatCurrency(parseInt(inquiry.budget_max))}</span>
                                                <span className="shrink-0">{formatDate(inquiry.createdAt)}</span>
                                            </div>
                                        </div>

                                        {enableActions && (
                                            <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9"
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
                    </div>
                </>
            )}
        </div>
    );
}
