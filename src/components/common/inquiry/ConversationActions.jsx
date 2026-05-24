export const ConversationActions = ({updateInquiryStatus, selectedInquiry, loading}) => {
  return (
    <div className="conversation-actions flex w-full flex-col gap-2 sm:w-auto">        
        <button
          onClick={() => updateInquiryStatus(selectedInquiry.id, 'reopen')}
          disabled={loading}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Reopening...' : 'Reopen Conversation'}
        </button>
    </div>
  );
};
