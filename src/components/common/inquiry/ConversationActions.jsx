export const ConversationActions = ({updateInquiryStatus, selectedInquiry, loading}) => {
  return (
    <div className="conversation-actions flex flex-col gap-2">        
        <button
          onClick={() => updateInquiryStatus(selectedInquiry.id, 'reopen')}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
        >
          {loading ? 'Reopening...' : 'Reopen Conversation'}
        </button>
    </div>
  );
};