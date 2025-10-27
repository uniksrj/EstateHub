import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
} from 'lucide-react';
import { inquiryWebhookService } from '@/services/webhook';
import { toast } from 'sonner';
import { demoInquiries } from '@/data/demoData';
import { HeaderLine } from './inquiry/HeaderLine';
import { FilterInquiryPage } from './inquiry/FilterInquiryPAge';
import { InquiryList } from './inquiry/InquiryList';
import { SidebarHeaderText } from './inquiry/SidebarHeaderText';
import { BuyerInfo } from './inquiry/BuyerInfo';
import { OriginalMsg } from './inquiry/OriginalMsg';
import { HistoryInquiry } from './inquiry/HistoryInquiry';
import { ActionButton } from './inquiry/ActionButton';
import { ResponseInquiry } from './inquiry/ResponseInquiry';
import echo from '../../echo.js';

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


  // using echo broadcasting message
  useEffect(() => {
    if (!selectedInquiry?.id) return;

    console.log('🔐 Setting up channel for inquiry:', selectedInquiry.id);

    // Use ONLY the working channel name
    const channelName = `inquiry.${selectedInquiry.id}`;

    console.log('📡 Subscribing to:', channelName);

    const channel = echo.private(channelName);

    channel.subscribed(() => {
      console.log('✅ ✅ ✅ SUCCESS: Subscribed to', channelName);
    });

    channel.error((error) => {
      console.error('❌ Subscription failed for', channelName, error);
    });

    channel.listen('.response.created', (event) => {
      console.log('📨 📨 📨 EVENT RECEIVED:', event);
      console.log('🔍 Full event data:', JSON.stringify(event, null, 2));

      // Update the state with the new response
      setSelectedInquiry(prev => ({
        ...prev,
        responses: [...(prev.responses || []), event.response],
      }));
    });

    // Also listen without the dot prefix (sometimes needed)
    channel.listen('response.created', (event) => {
      console.log('📨 EVENT RECEIVED (without dot):', event);
    });

    return () => {
      console.log('🔴 Leaving channel:', channelName);
      echo.leave(channelName);
    };
  }, [selectedInquiry?.id]);

  console.log("new updated inquiry every time :", selectedInquiry);


  // Fetch inquiries for specific user
  useEffect(() => {
    if (userId) {
      fetchInquiries();
    }
  }, [userId]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const data = await inquiryWebhookService.getInquiries();
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
      let { data } = await inquiryWebhookService.sendResponse(inquiryId, { "message": responseMessage });
      let newResponse = data;
      

      // const newResponse = {
      //   id: Date.now(),
      //   message: responseMessage,
      //   timestamp: new Date().toISOString(),
      //   sender: userType === 'seller' ? 'seller' : 'buyer'
      // };

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
                  {/* Header Text  */}
                  <SidebarHeaderText
                    selectedInquiry={selectedInquiry}
                  />
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Buyer Information */}
                  {(userType != "buyer" &&
                    <BuyerInfo
                      selectedInquiry={selectedInquiry}
                    />
                  )}



                  {/* Original Message */}
                  <OriginalMsg
                    selectedInquiry={selectedInquiry}
                  />

                  {/* Conversation History */}
                  {selectedInquiry.responses && selectedInquiry.responses.length > 0 && (
                    <HistoryInquiry
                      userId={userId}
                      selectedInquiry={selectedInquiry}
                    />
                  )}

                  {/* Response Input */}
                  {enableActions && (
                    <ResponseInquiry
                      responseMessage={responseMessage}
                      setResponseMessage={setResponseMessage}
                    />
                  )}

                  {/* Action Buttons */}
                  {enableActions && (
                    <ActionButton
                      sendResponse={sendResponse}
                      selectedInquiry={selectedInquiry}
                      responseMessage={responseMessage}
                      updateInquiryStatus={updateInquiryStatus}
                      toggleImportant={toggleImportant}
                      archiveInquiry={archiveInquiry}
                    />
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