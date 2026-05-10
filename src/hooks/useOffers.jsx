"use client"

import OfferContext from "@/context/OfferContext";
import { useContext } from "react";

export const useOffers = () => {
  const context = useContext(OfferContext);
  if (!context) {
    throw new Error('useOffers must be used within an OfferProvider');
  }
  return context;
};