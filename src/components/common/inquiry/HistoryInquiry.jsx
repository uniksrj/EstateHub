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

    const getResponses = () => {
        if (!selectedInquiry || !selectedInquiry.responses || !Array.isArray(selectedInquiry.responses)) {
            return [];
        }

        // Remove duplicates
        const seenIds = new Set();
        return selectedInquiry.responses.filter(response => {
            if (!response?.id) return false;
            if (seenIds.has(response.id)) return false;
            seenIds.add(response.id);
            return true;
        });
    };

    const responses = getResponses();
    return (
        <div>
            <h4 className="mb-3 border-b pb-2 text-base font-semibold sm:text-lg">Conversation History</h4>
            <div ref={bottomRef} className="max-h-72 space-y-3 overflow-y-auto pr-1">
                {responses.map((response) => (
                    <div
                        key={response.id}
                        className={`max-w-[92%] rounded-md p-3 ${response.sender_id === userId
                            ? 'ml-auto bg-primary text-primary-foreground'
                            : 'mr-auto bg-muted'
                            }`}
                    >
                        <p className="whitespace-pre-wrap break-words text-sm leading-6">{response.message}</p>
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
