import { InquiryPage } from "@/components/common/InquiryPage";
import { useAuth } from "@/hooks/useAuth";

export const SellerInquiryPage = () => {
  const { user } = useAuth(); 
  
  return (
    <InquiryPage 
      userId={user.id}
      userType="seller"
      showFilters={true}
      enableActions={true}
    />
  );
};