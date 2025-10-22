import { Textarea } from "@/components/ui/textarea";

export const ResponseInquiry = ({responseMessage, setResponseMessage}) => {
    return (
        <div>
            <h4 className="font-semibold mb-3 text-lg border-b pb-2">Your Response</h4>
            <Textarea
                placeholder="Type your response to the buyer..."
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                rows={5}
                className="resize-vertical text-base p-3"
            />
        </div>
    );
}