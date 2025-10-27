import { formatDateTime } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const HistoryInquiry = ({ selectedInquiry, userId }) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        const el = bottomRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [selectedInquiry?.responses]);

    return (
        <div>
            <h4 className="font-semibold mb-3 text-lg border-b pb-2">Conversation History</h4>
            <div ref={bottomRef} className="space-y-3 max-h-60 overflow-y-auto">
                {selectedInquiry.responses.map((response) => (
                    <div
                        key={response.id}
                        className={`p-3 rounded-lg ${response.sender_id === userId
                            ? 'bg-primary text-primary-foreground ml-8'
                            : 'bg-muted mr-8'
                            }`}
                    >
                        <p className="text-sm whitespace-pre-wrap">{response.message}</p>
                        <p className={`text-xs mt-1 ${response.sender_id === userId ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            }`}>
                            {formatDateTime(response.timestamp ? response.timestamp : response.created_at)} • {response.sender_id === userId ? 'You' : response.sender_name ? response.sender_name : response.sender.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}