import { Button } from "@/components/ui/button";
import { userAPI } from "@/services/api";
import * as Dialog from "@radix-ui/react-dialog";
import { Upload, X, FileText, Users, Signature } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";

const UploadDocumentModal = ({ isOpen, onClose, deal, documentType, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const [sharedWith, setSharedWith] = useState(['buyer', 'seller']);
  const [requiresSignature, setRequiresSignature] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a PDF, Word document, or image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleSharedWithChange = (party) => {
    setSharedWith(prev =>
      prev.includes(party)
        ? prev.filter(p => p !== party)
        : [...prev, party]
    );
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('document_type', documentType.type);
      formData.append('description', description);
      sharedWith.forEach(item => {
        formData.append('shared_with[]', item);
      });
      formData.append('requires_signature', Boolean(requiresSignature));
      formData.append('deal_id', deal.id);

      const response = await userAPI.upload_document(formData);
      onUploadComplete(response?.data?.document);
      
      setSelectedFile(null);
      setDescription('');
      setSharedWith(['buyer', 'seller']);
      setRequiresSignature(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      onClose();

    } catch (error) {
      console.error('Upload error:', error);
      toast("Failed to upload document. Please try again.")
    } finally {
      setUploading(false);
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full bg-card rounded-lg shadow-lg z-50 p-0 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-card">
            <Dialog.Title className="text-lg font-semibold">
              Upload {documentType?.name}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm" disabled={uploading}>
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="p-4 space-y-4">
            {/* File Selection with Drag & Drop */}
            <div>
              <label className="block text-sm font-medium mb-2">Select File</label>
              <div
                className={`
                  border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
                  ${isDragOver
                    ? 'border-primary bg-primary/5'
                    : selectedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleAreaClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file-upload"
                  className="hidden"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />

                {selectedFile ? (
                  <div className="space-y-2">
                    <FileText className="mx-auto size-8 text-green-500" />
                    <p className="text-sm font-medium text-green-700">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto size-8 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {isDragOver ? 'Drop file here' : 'Click to select or drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, Word, JPG, PNG (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of this document"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows="3"
              />
            </div>

            {/* Share With */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="size-4" />
                Share With
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sharedWith.includes('buyer')}
                    onChange={() => handleSharedWithChange('buyer')}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Buyer</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sharedWith.includes('seller')}
                    onChange={() => handleSharedWithChange('seller')}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Seller</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={sharedWith.includes('lender')}
                    onChange={() => handleSharedWithChange('lender')}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">Lender</span>
                </label>
              </div>
            </div>

            {/* Requires Signature */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Signature className="size-4" />
                Signature Required
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={requiresSignature}
                  onChange={(e) => setRequiresSignature(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">This document requires electronic signature</span>
              </label>
              {requiresSignature && (
                <p className="text-xs text-gray-500 mt-1">
                  An e-signature request will be sent to the selected parties
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t">
              <Dialog.Close asChild>
                <Button variant="outline" disabled={uploading}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="size-4" />
                    Upload Document
                  </>
                )}
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadDocumentModal;