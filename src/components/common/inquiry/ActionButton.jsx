import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Star, Trash2 } from "lucide-react";
import { ConversationActions } from "./ConversationActions";

export const ActionButton = ({ sendResponse, selectedInquiry, responseMessage, updateInquiryStatus, toggleImportant, archiveInquiry ,loading}) => {
    
    return (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:flex-wrap">
            {selectedInquiry.status !== 3 ? (
                <>
                    <Button
                        onClick={() => sendResponse(selectedInquiry.id)}
                        disabled={!responseMessage.trim()}
                        className="h-10 w-full text-sm sm:min-w-44 sm:flex-1 sm:text-base"
                        size="lg"
                    >
                        <Send className="h-5 w-5 mr-2" />
                        Send Response
                    </Button>

                    <Select
                        value={String(selectedInquiry.status)}
                        onValueChange={(value) => updateInquiryStatus(selectedInquiry.id, Number(value))}
                        disabled={selectedInquiry.status === 3}
                    >
                        <SelectTrigger className="h-10 w-full px-3 sm:w-40">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0" disabled={selectedInquiry.status >= 0}>New</SelectItem>
                            <SelectItem value="1" disabled={selectedInquiry.status >= 1}>Responded</SelectItem>
                            <SelectItem value="2" disabled={selectedInquiry.status >= 2}>Contacted</SelectItem>
                            <SelectItem value="3">Closed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        size="lg"
                        className="h-10 w-full px-3 sm:w-auto"
                        onClick={() => toggleImportant(selectedInquiry.id, selectedInquiry.important)}
                    >
                        <Star className={`h-5 w-5 sm:mr-0 ${selectedInquiry.important ? 'fill-amber-500 text-amber-500' : ''}`} />
                        <span className="ml-2 sm:hidden">
                            {selectedInquiry.important ? 'Remove Favorite' : 'Mark Favorite'}
                        </span>
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="h-10 w-full px-3 sm:w-auto"
                        disabled
                        onClick={() => archiveInquiry(selectedInquiry.id)}
                    >
                        <Trash2 className="h-5 w-5 sm:mr-0" />
                        <span className="ml-2 sm:hidden">Remove Inquiry</span>
                    </Button>
                </>
            ) : (
                <>
                <ConversationActions updateInquiryStatus={updateInquiryStatus} selectedInquiry={selectedInquiry} loading={loading}/>
                </>
            )}
        </div>
    );
}
