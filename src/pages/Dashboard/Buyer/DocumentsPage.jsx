import { useState } from 'react';
import { FileText, Download, Upload, Search, Filter, Folder, Eye, Share2, Trash2, MoreVertical, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const DocumentsPage = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Purchase Agreement - 123 Main St.pdf",
      type: "contract",
      size: "2.4 MB",
      uploaded: "2024-01-15",
      status: "signed",
      category: "Offers & Contracts"
    },
    {
      id: 2,
      name: "Mortgage Pre-Approval Letter.pdf",
      type: "financial",
      size: "1.1 MB",
      uploaded: "2024-01-12",
      status: "reviewed",
      category: "Financing"
    },
    {
      id: 3,
      name: "Home Inspection Report.pdf",
      type: "inspection",
      size: "5.7 MB",
      uploaded: "2024-01-10",
      status: "pending_review",
      category: "Inspections"
    },
    {
      id: 4,
      name: "Property Disclosure Statement.pdf",
      type: "disclosure",
      size: "3.2 MB",
      uploaded: "2024-01-08",
      status: "signed",
      category: "Disclosures"
    },
    {
      id: 5,
      name: "Home Insurance Quote.pdf",
      type: "insurance",
      size: "0.8 MB",
      uploaded: "2024-01-05",
      status: "reviewed",
      category: "Insurance"
    },
    {
      id: 6,
      name: "Title Insurance Policy.pdf",
      type: "title",
      size: "4.1 MB",
      uploaded: "2024-01-03",
      status: "pending_signature",
      category: "Title & Closing"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const categories = [
    "All Categories",
    "Offers & Contracts",
    "Financing",
    "Inspections",
    "Disclosures",
    "Insurance",
    "Title & Closing"
  ];

  const statuses = [
    "All Statuses",
    "Signed",
    "Reviewed",
    "Pending Review",
    "Pending Signature"
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'signed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'reviewed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending_review':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'pending_signature':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'signed':
        return "Signed";
      case 'reviewed':
        return "Reviewed";
      case 'pending_review':
        return "Pending Review";
      case 'pending_signature':
        return "Signature Required";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'signed':
        return 'text-success';
      case 'reviewed':
        return 'text-success';
      case 'pending_review':
        return 'text-warning';
      case 'pending_signature':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'Signed' && doc.status === 'signed') ||
                         (filterStatus === 'Reviewed' && doc.status === 'reviewed') ||
                         (filterStatus === 'Pending Review' && doc.status === 'pending_review') ||
                         (filterStatus === 'Pending Signature' && doc.status === 'pending_signature');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newDoc = {
        id: documents.length + 1,
        name: file.name,
        type: "other",
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded: new Date().toISOString().split('T')[0],
        status: "pending_review",
        category: "Other"
      };
      setDocuments(prev => [newDoc, ...prev]);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          </div>
          <p className="text-muted-foreground">Manage all your property documents in one place</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-foreground">{documents.length}</div>
            <div className="text-sm text-muted-foreground">Total Documents</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-success">{documents.filter(d => d.status === 'signed').length}</div>
            <div className="text-sm text-muted-foreground">Signed</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-warning">{documents.filter(d => d.status.includes('pending')).length}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="text-2xl font-bold text-primary">{documents.filter(d => d.status === 'reviewed').length}</div>
            <div className="text-sm text-muted-foreground">Reviewed</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category === "All Categories" ? "all" : category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {statuses.map(status => (
                  <option key={status} value={status === "All Statuses" ? "all" : status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Button */}
            <label className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 cursor-pointer flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-full bg-card rounded-xl shadow-lg border border-border p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-card-foreground mb-2">No documents found</h3>
              <p className="text-muted-foreground mb-6">
                {documents.length === 0 
                  ? "You haven't uploaded any documents yet." 
                  : "No documents match your current filters."}
              </p>
              <label className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 cursor-pointer inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Your First Document
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          ) : (
            filteredDocuments.map(doc => (
              <div key={doc.id} className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground line-clamp-1">{doc.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(doc.status)}
                        <span className={`text-sm ${getStatusColor(doc.status)}`}>
                          {getStatusText(doc.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-muted rounded transition-colors duration-200">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span>{doc.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Uploaded {formatDate(doc.uploaded)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Size: {doc.size}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-input rounded-lg text-sm font-medium text-card-foreground hover:bg-muted transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-card rounded-xl shadow-lg border border-border p-6">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">Document Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Purchase Agreement", completed: true },
              { name: "Mortgage Documents", completed: true },
              { name: "Inspection Reports", completed: false },
              { name: "Insurance Policies", completed: false }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  item.completed 
                    ? 'bg-success border-success text-primary-foreground' 
                    : 'border-muted-foreground'
                }`}>
                  {item.completed && <CheckCircle className="w-3 h-3" />}
                </div>
                <span className={`text-sm ${item.completed ? 'text-success' : 'text-card-foreground'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage;