import { formatDateTime } from "@/lib/utils";

export const OriginalMsg = ({selectedInquiry}) => {
    return (
        <div>
            <h4 className="font-semibold mb-3 text-lg border-b pb-2">Original Message</h4>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{selectedInquiry.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                    Received: {formatDateTime(selectedInquiry.createdAt)}
                </p>
            </div>
        </div>
    );
}