import { Button } from "@/components/ui/button";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, FileText, X, Image, FileSpreadsheet } from "lucide-react";
import FilePreview from "./FilePreview";

const ViewDocumentModal = ({ isOpen, onClose, document }) => {
  if (!document) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl w-full h-[80vh] bg-white rounded-lg shadow-lg z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Dialog.Title className="text-lg font-semibold truncate max-w-[80%]">
              {document.original_name || document.document_name}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm">
                <X className="size-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Document Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-100 rounded-lg">
              <div>
                <div className="text-sm font-medium">Document Type</div>
                <div className="text-sm text-gray-600 capitalize">
                  {document.document_type?.replace(/_/g, ' ') || 'Document'}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">File Type</div>
                <div className="text-sm text-gray-600 capitalize">
                  {document.file_type || 'Unknown'}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Uploaded</div>
                <div className="text-sm text-gray-600">
                  {new Date(document.created_at).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">File Size</div>
                <div className="text-sm text-gray-600">
                  {document.file_size ? `${(document.file_size / 1024 / 1024).toFixed(2)} MB` : 'Unknown'}
                </div>
              </div>
              {document.description && (
                <div className="col-span-2">
                  <div className="text-sm font-medium">Description</div>
                  <div className="text-sm text-gray-600">{document.description}</div>
                </div>
              )}
            </div>

            {/* File Preview */}
            <FilePreview document={document} />
            
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ViewDocumentModal;