import { Textarea } from "@/components/ui/textarea";

export const ResponseInquiry = ({ status, responseMessage, setResponseMessage }) => {
    return (
        <div>
            {status !== 3 ? (
                <>
                    <h4 className="mb-3 border-b pb-2 text-base font-semibold sm:text-lg">Your Response</h4>
                    <Textarea
                        placeholder="Type your response to the buyer..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        rows={5}
                        className="min-h-32 resize-y p-3 text-sm sm:text-base"
                    />
                </>
            ) : (
                <div className="rounded-md bg-muted p-4 text-center text-muted-foreground">
                    <h4 className="mb-1 text-base font-semibold sm:text-lg">This Inquiry Is Closed</h4>
                    {/* <p className="text-sm">
                        This conversation has been closed and no further responses can be sent.
                        Please contact an administrator if you believe this inquiry should be reopened.
                    </p> */}
                </div>
            )}
        </div>
    );
}
