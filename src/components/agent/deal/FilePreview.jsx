import { FileText, FileSpreadsheet } from "lucide-react";

const FilePreview = ({ document }) => {
  const getFileType = (fileType) => {
    if (!fileType) return 'unknown';

    if (fileType.includes('pdf')) return 'pdf';
    if (fileType.includes('image')) return 'image';
    if (fileType.includes('word') || fileType.includes('document')) return 'word';
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return 'excel';
    if (fileType.includes('text')) return 'text';
    return 'unknown';
  };

  const fileType = getFileType(document.file_type);

  const renderPreview = () => {
    switch (fileType) {
      case 'pdf':
        return (
          <iframe
            src={document.file_url}
            className="w-full h-full rounded-lg"
            title={document.original_name}
          />
        );

      case 'image':
        return (
          <div className="flex items-center justify-center h-full p-4">
            <img
              src={document.file_url}
              alt={document.original_name}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        );

      case 'word':
        return (
          <div className="flex flex-col items-center justify-center h-full text-blue-600 p-4">
            <FileText className="size-16 mb-4" />
            <p className="text-lg font-medium">Word Document</p>
            <p className="text-sm text-gray-500 mt-2">{document.original_name}</p>
            <p className="text-xs text-gray-400 mt-1">Preview not available</p>
          </div>
        );

      case 'excel':
        return (
          <div className="flex flex-col items-center justify-center h-full text-green-600 p-4">
            <FileSpreadsheet className="size-16 mb-4" />
            <p className="text-lg font-medium">Excel Spreadsheet</p>
            <p className="text-sm text-gray-500 mt-2">{document.original_name}</p>
            <p className="text-xs text-gray-400 mt-1">Preview not available</p>
          </div>
        );

      case 'text':
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-600 p-4">
            <FileText className="size-16 mb-4" />
            <p className="text-lg font-medium">Text File</p>
            <p className="text-sm text-gray-500 mt-2">{document.original_name}</p>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
            <FileText className="size-16 mb-4" />
            <p className="text-lg font-medium">{document.original_name}</p>
            <p className="text-sm text-gray-500 mt-2">File Type: {document.file_type}</p>
            <p className="text-xs text-gray-400 mt-1">Preview not available</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 border rounded-lg bg-white overflow-hidden">
      {renderPreview()}
    </div>
  );
};

export default FilePreview;