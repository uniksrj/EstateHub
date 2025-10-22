import { formatDateTime } from "@/lib/utils";

export const HistoryInquiry = ({selectedInquiry}) => {
    return (
        <div>
            <h4 className="font-semibold mb-3 text-lg border-b pb-2">Conversation History</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedInquiry.responses.map((response) => (
                    <div
                        key={response.id}
                        className={`p-3 rounded-lg ${response.sender === 'seller'
                            ? 'bg-primary text-primary-foreground ml-8'
                            : 'bg-muted mr-8'
                            }`}
                    >
                        <p className="text-sm whitespace-pre-wrap">{response.message}</p>
                        <p className={`text-xs mt-1 ${response.sender === 'seller' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>
                            {formatDateTime(response.timestamp)} • {response.sender === 'seller' ? 'You' : selectedInquiry.buyerName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}