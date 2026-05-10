import { InquiryPage } from "@/components/common/InquiryPage";
import { useAuth } from "@/hooks/useAuth";

export const BuyerInquiryPage = () => {
  const { user } = useAuth();
  
  return (
    <InquiryPage 
      userId={user.id}
      userType={"buyer"}
      showFilters={true}
      enableActions={true} 
    />
  );
};