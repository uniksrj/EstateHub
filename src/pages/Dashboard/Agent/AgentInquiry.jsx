
import { InquiryPage } from "@/components/common/InquiryPage";
import { useAuth } from "@/hooks/useAuth";

export const AgentInquiry = () => {
  const { user } = useAuth();
  
  return (
    <InquiryPage 
      userId={user.id}
      userType={"seller"}
      showFilters={true}
      enableActions={true} 
    />
  );
};
