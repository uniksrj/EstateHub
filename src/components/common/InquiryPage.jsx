import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Calendar,
  User,
  Mail,
  Phone,
  Send,
  Trash2,
  Star,
  Loader2
} from 'lucide-react';
import { inquiryWebhookService } from '@/services/webhook';
import { toast } from 'sonner';
import { demoInquiries } from '@/data/demoData';
import { formatDate, formatDateTime } from '@/lib/utils';
import { HeaderLine } from './inquiry/HeaderLine';
import { FilterInquiryPage } from './inquiry/FilterInquiryPAge';
import { InquiryList } from './inquiry/InquiryList';

export const InquiryPage = ({
  userId,
  userType = 'seller', 
  showFilters = true,
  enableActions = true
}) => {
  const [inquiries, setInquiries] = useState(demoInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [responseMessage, setResponseMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch inquiries for specific user
  useEffect(() => {
    if (userId) {
      fetchInquiries();
    }
  }, [userId]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await inquiryWebhookService.getInquiries(userId, userType);
      setInquiries(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const updateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      await inquiryWebhookService.updateStatus(inquiryId, newStatus);

      setInquiries(prev => prev.map(inquiry =>
        inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
      ));

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }

      toast.success('Status updated successfully');
    } catch (error) {
      console.error("Failed to update status", error);      
      toast.error('Failed to update status');
    }
  };

  const sendResponse = async (inquiryId) => {
    if (!responseMessage.trim()) return;

    try {
      await inquiryWebhookService.sendResponse(inquiryId, responseMessage);

      const newResponse = {
        id: Date.now(),
        message: responseMessage,
        timestamp: new Date().toISOString(),
        sender: userType === 'seller' ? 'seller' : 'buyer'
      };

      setInquiries(prev => prev.map(inquiry =>
        inquiry.id === inquiryId
          ? {
            ...inquiry,
            status: 'responded',
            responses: [...(inquiry.responses || []), newResponse]
          }
          : inquiry
      ));

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(prev => ({
          ...prev,
          status: 'responded',
          responses: [...(prev.responses || []), newResponse]
        }));
      }

      setResponseMessage('');
      toast.success('Response sent successfully');
    } catch (error) {
      console.error("Failed to send response", error);    
      toast.error('Failed to send response');
    }
  };

  const toggleImportant = async (inquiryId, currentStatus) => {
    try {
      await inquiryWebhookService.toggleImportant(inquiryId, !currentStatus);

      setInquiries(prev => prev.map(inquiry =>
        inquiry.id === inquiryId ? { ...inquiry, important: !currentStatus } : inquiry
      ));

      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(prev => ({ ...prev, important: !currentStatus }));
      }

      toast.success('Important status updated');
    } catch (error) {
      console.error(error);  
      toast.error('Failed to update important status');
    }
  };

  const archiveInquiry = async (inquiryId) => {
    if (!confirm('Are you sure you want to archive this inquiry?')) return;

    try {
      await inquiryWebhookService.archiveInquiry(inquiryId);

      setInquiries(prev => prev.filter(inquiry => inquiry.id !== inquiryId));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(null);
      }

      toast.success('Inquiry archived successfully');
    } catch (error) {
      console.error(error);  
      toast.error('Failed to archive inquiry');
    }
  };

  // Filter inquiries based on user type
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = statusFilter === 'all' || inquiry.status === statusFilter;
    const matchesSearch = inquiry.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">

        {/* Header Text */}
        <HeaderLine userType={userType} />

        {/* Filter Header */}
        <FilterInquiryPage 
        showFilters={showFilters} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiry List */}
        <InquiryList 
        loading={loading}
        filteredInquiries={filteredInquiries}
        setSelectedInquiry={setSelectedInquiry}
        selectedInquiry={selectedInquiry}
        enableActions={enableActions}
        toggleImportant={toggleImportant}
        />

        {/* Details Sidebar */}
        <div className="space-y-6">
          {selectedInquiry ? (
            <>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{selectedInquiry.buyerName}</CardTitle>
                      <CardDescription className="text-base">
                        Inquiry about {selectedInquiry.propertyTitle}
                      </CardDescription>
                    </div>
                    <Badge variant={
                      selectedInquiry.status === 'new' ? 'default' :
                        selectedInquiry.status === 'responded' ? 'secondary' : 'outline'
                    }>
                      {selectedInquiry.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Buyer Information */}
                  <div>
                    <h4 className="font-semibold mb-3 text-lg border-b pb-2">Buyer Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Name:</strong> {selectedInquiry.buyerName}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Email:</strong> {selectedInquiry.buyerEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Phone:</strong> {selectedInquiry.buyerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span><strong>Timeline:</strong> {selectedInquiry.timeline}</span>
                      </div>
                      <div className="p-2 bg-muted rounded-lg">
                        <strong>Budget Range:</strong> ${parseInt(selectedInquiry.budget_min).toLocaleString()} - ${parseInt(selectedInquiry.budget_max).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Original Message */}
                  <div>
                    <h4 className="font-semibold mb-3 text-lg border-b pb-2">Original Message</h4>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedInquiry.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Received: {formatDateTime(selectedInquiry.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Conversation History */}
                  {selectedInquiry.responses && selectedInquiry.responses.length > 0 && (
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
                  )}

                  {/* Response Input */}
                  {enableActions && (
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
                  )}

                  {/* Action Buttons */}
                  {enableActions && (
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
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inquiry Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                      <span>Total Inquiries:</span>
                      <Badge variant="outline">{inquiries.length}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                      <span>New Inquiries:</span>
                      <Badge variant="default">
                        {inquiries.filter(i => i.status === 'new').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                      <span>Responded:</span>
                      <Badge variant="secondary">
                        {inquiries.filter(i => i.status === 'responded').length}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 hover:bg-muted rounded">
                      <span>Important:</span>
                      <Badge variant="default" className="bg-amber-500">
                        {inquiries.filter(i => i.important).length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Select an Inquiry</h3>
                <p className="text-muted-foreground">
                  Click on an inquiry from the list to view details and respond to the buyer
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};