import { useState } from "react";
import { propertiesAPI } from "./../services/api";  
import { toast } from "sonner";


export const useDeleteProperty = (onSuccess) => {
  const [loadingDelete, setLoading] = useState(false);       
  const deleteProperty = async (id) => {   
    if (!window.confirm("Are you sure you want to delete?")) return;  
    setLoading(true);
    try {
      await propertiesAPI.delete(id);
      toast.success("Property deleted successfully");
      onSuccess?.(id);
    } catch(e){
      console.error(e);
      toast.error("Failed to delete property. Please try again.");
    }
      finally {
      setLoading(false);
    }
  };
  return { deleteProperty, loadingDelete };
};