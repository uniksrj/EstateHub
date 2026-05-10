import { Textarea } from "@/components/ui/textarea";

export const ResponseInquiry = ({ status, responseMessage, setResponseMessage }) => {
    return (
        <div>
            {status !== 3 ? (
                <>
                    <h4 className="font-semibold mb-3 text-lg border-b pb-2">Your Response</h4>
                    <Textarea
                        placeholder="Type your response to the buyer..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        rows={5}
                        className="resize-vertical text-base p-3"
                    />
                </>
            ) : (
                <div className="p-4 rounded-md bg-muted text-muted-foreground text-center">
                    <h4 className="font-semibold text-lg mb-1">This Inquiry Is Closed</h4>
                    {/* <p className="text-sm">
                        This conversation has been closed and no further responses can be sent.
                        Please contact an administrator if you believe this inquiry should be reopened.
                    </p> */}
                </div>
            )}
        </div>
    );
}