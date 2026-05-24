import { formatDateTime } from "@/lib/utils";

export const OriginalMsg = ({selectedInquiry}) => {
    return (
        <div>
            <h4 className="mb-3 border-b pb-2 text-base font-semibold sm:text-lg">Original Message</h4>
            <div className="border-l-2 border-primary/30 pl-4">
                <p className="whitespace-pre-wrap break-words text-sm leading-6">{selectedInquiry.message}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                    Received: {formatDateTime(selectedInquiry.createdAt)}
                </p>
            </div>
        </div>
    );
}
