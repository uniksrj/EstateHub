import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Star, Trash2 } from "lucide-react";

export const ActionButton = ({sendResponse, selectedInquiry, responseMessage, updateInquiryStatus, toggleImportant, archiveInquiry}) => {
    return (
        <div className="flex gap-3 pt-4">
            <Button
                onClick={() => sendResponse(selectedInquiry.id)}
                disabled={!responseMessage.trim()}
                className="flex-1 h-12 text-base"
                size="lg"
            >
                <Send className="h-5 w-5 mr-2" />
                Send Response
            </Button>

            <Select
                value={selectedInquiry.status}
                onValueChange={(value) => updateInquiryStatus(selectedInquiry.id, value)}
            >
                <SelectTrigger className="w-36 h-12">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="lg"
                className="h-12 px-3"
                onClick={() => toggleImportant(selectedInquiry.id, selectedInquiry.important)}
            >
                <Star className={`h-5 w-5 ${selectedInquiry.important ? 'fill-amber-500 text-amber-500' : ''}`} />
            </Button>

            <Button
                variant="outline"
                size="lg"
                className="h-12 px-3"
                onClick={() => archiveInquiry(selectedInquiry.id)}
            >
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>
    );
}