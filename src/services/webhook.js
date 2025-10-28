import { Webhook } from "lucide-react";
import { webhookAPI } from "./api";

// Webhook API service for inquiries
export const inquiryWebhookService = {
  // Get all inquiries for seller
  async getInquiries() {
    try {
      const response = await webhookAPI.getInquiryList();
      if (response.status !== 200) throw new Error('Failed to fetch inquiries');
      return response.data;
    } catch (error) {
      console.error('Webhook Error - Get Inquiries:', error);
      throw error;
    }
  },

  // Update inquiry status
  async updateStatus(inquiryId, status) {
    try {
      const response = await webhookAPI.inquiry_close(inquiryId, status)

      if (response.status !== 200) throw new Error('Failed to update status');
      return response.data;
    } catch (error) {
      console.error('Webhook Error - Update Status:', error);
      throw error;
    }
  },

  // Send response to buyer
  async sendResponse(inquiryId, message) {
    try {
      const response = await webhookAPI.inquiry_respond(inquiryId, message)
      if (response.status !== 200) throw new Error('Failed to submit response');
      return response.data;
    } catch (error) {
      console.error('Webhook Error - Send Response:', error);
      throw error;
    }
  },

  // Toggle important status
  async toggleImportant(inquiryId, important) {
    try {
      const response = await fetch(`/api/webhook/inquiries/${inquiryId}/important`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ important })
      });

      if (!response.ok) throw new Error('Failed to update important status');
      return await response.json();
    } catch (error) {
      console.error('Webhook Error - Toggle Important:', error);
      throw error;
    }
  },

  // Archive/delete inquiry
  async archiveInquiry(inquiryId) {
    try {
      const response = await fetch(`/api/webhook/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) throw new Error('Failed to archive inquiry');
      return await response.json();
    } catch (error) {
      console.error('Webhook Error - Archive Inquiry:', error);
      throw error;
    }
  }
};