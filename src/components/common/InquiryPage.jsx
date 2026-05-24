import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
} from 'lucide-react';
import { inquiryWebhookService } from '@/services/webhook';
import { toast, Toaster } from 'sonner';
import { demoInquiries } from '@/data/demoData';
import { HeaderLine } from './inquiry/HeaderLine';
import { FilterInquiryPage } from './inquiry/FilterInquiryPage';
import { InquiryList } from './inquiry/InquiryList';
import { SidebarHeaderText } from './inquiry/SidebarHeaderText';
import { BuyerInfo } from './inquiry/BuyerInfo';
import { OriginalMsg } from './inquiry/OriginalMsg';
import { HistoryInquiry } from './inquiry/HistoryInquiry';
import { ActionButton } from './inquiry/ActionButton';
import { ResponseInquiry } from './inquiry/ResponseInquiry';
import echo, { refreshEchoAuth } from '../../echo.js';

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
    refreshEchoAuth();

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

      setInquiries((prev) =>
        prev.map((inquiry) =>
          inquiry.id === selectedInquiry.id
            ? {
                ...inquiry,
                responses: [...(inquiry.responses || []), event.response],
              }
            : inquiry
        )
      );

      setSelectedInquiry((prev) => ({
        ...(prev || {}),
        responses: [...(prev?.responses || []), event.response],
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
//End Fetch inquiries for specific user

// Change Inquiry response status
  const updateInquiryStatus = async (inquiryId, newStatus) => {
    setLoading(true)
    try {
      if (newStatus === 3) {
        let statusResponse = {
          status: newStatus,
          close_reason: "Conversation Closed successfully"
        }
        await inquiryWebhookService.updateStatus(inquiryId, statusResponse);
      } else if (newStatus === 'reopen') {
        let statusResponse = {
          status: 2,
          close_reason: "Conversation Re-open successfully"
        }
        await inquiryWebhookService.updateStatus(inquiryId, statusResponse);
        newStatus = 2;
      }
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
    } finally {
      setLoading(false)
    }
  };
//End Change Inquiry response status


  const sendResponse = async (inquiryId) => {
    if (!responseMessage.trim()) return;

    try {
      let { data } = await inquiryWebhookService.sendResponse(inquiryId, { "message": responseMessage, selectedResponse: selectedInquiry.status });

      let newResponse = data;
      console.log("Inside Response Data :",newResponse);
      
      setInquiries(prev => prev.map(inquiry =>
        inquiry.id === inquiryId
          ? {
            ...inquiry,
            responses: [...(inquiry.responses || []), newResponse]
          }
          : inquiry
      ));
      console.log("Inside inquiries Data :",inquiries);
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry(prev => ({
          ...prev,
          responses: [...(prev.responses || []), newResponse]
        }));
      }
console.log("Inside inquiries Data :",selectedInquiry);
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

  console.log("full log Data :",inquiries);
  

  // Filter inquiries based on user type
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = statusFilter === 'all' || inquiry.status === Number(statusFilter);
    const matchesSearch = inquiry.buyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.propertyTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: inquiries.length,
    new: inquiries.filter(i => Number(i.status) === 0).length,
    responded: inquiries.filter(i => Number(i.status) === 1).length,
    important: inquiries.filter(i => i.important).length,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Toaster position="top-right" />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <HeaderLine userType={userType} />

        <FilterInquiryPage
          showFilters={showFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]">
        <InquiryList
          loading={loading}
          filteredInquiries={filteredInquiries}
          setSelectedInquiry={setSelectedInquiry}
          selectedInquiry={selectedInquiry}
          enableActions={enableActions}
          toggleImportant={toggleImportant}
        />

        <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
          {selectedInquiry ? (
            <>
              <Card className="overflow-hidden shadow-sm">
                <CardHeader className="border-b p-4 sm:p-5">
                  <SidebarHeaderText
                    selectedInquiry={selectedInquiry}
                  />
                </CardHeader>
                <CardContent className="space-y-5 p-4 sm:p-5">
                  {(userType != "buyer" &&
                    <BuyerInfo
                      selectedInquiry={selectedInquiry}
                    />
                  )}

                  <OriginalMsg
                    selectedInquiry={selectedInquiry}
                  />

                  {selectedInquiry.responses && selectedInquiry.responses.length > 0 && (
                    <HistoryInquiry
                      userId={userId}
                      selectedInquiry={selectedInquiry}
                    />
                  )}

                  {enableActions && (
                    <ResponseInquiry
                      status={selectedInquiry.status}
                      responseMessage={responseMessage}
                      setResponseMessage={setResponseMessage}
                    />
                  )}

                  {enableActions && (
                    <ActionButton
                      sendResponse={sendResponse}
                      selectedInquiry={selectedInquiry}
                      responseMessage={responseMessage}
                      updateInquiryStatus={updateInquiryStatus}
                      toggleImportant={toggleImportant}
                      archiveInquiry={archiveInquiry}
                      loading={loading}
                    />
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                  <CardTitle className="text-lg">Inquiry Statistics</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2 sm:p-5 sm:pt-2">
                  <div className="divide-y text-sm">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Total Inquiries</span>
                      <Badge variant="outline">{stats.total}</Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">New Inquiries</span>
                      <Badge variant="default">
                        {stats.new}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Responded</span>
                      <Badge variant="secondary">
                        {stats.responded}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">Important</span>
                      <Badge variant="default" className="bg-amber-500">
                        {stats.important}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-sm">
              <CardContent className="p-6 text-center sm:p-8">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50 sm:h-14 sm:w-14" />
                <h3 className="mb-2 text-lg font-semibold">Select an Inquiry</h3>
                <p className="mx-auto max-w-sm text-sm text-muted-foreground">
                  Click on an inquiry from the list to view details and respond to the buyer
                </p>
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
};
