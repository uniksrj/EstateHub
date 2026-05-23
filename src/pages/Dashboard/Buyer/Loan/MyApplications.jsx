import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Clock, Eye, Search, DollarSign, TrendingUp } from 'lucide-react';
import ApplicationDetailsModal from './ApplicationDetailsModal';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const savedApps = JSON.parse(localStorage.getItem('loanApplications') || '[]');
    setApplications(savedApps);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Under Review' },
      approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, text: 'Rejected' },
      documents: { color: 'bg-blue-100 text-blue-800', icon: FileText, text: 'Documents Needed' },
      processing: { color: 'bg-purple-100 text-purple-800', icon: TrendingUp, text: 'Processing' }
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredApplications = applications
    .filter(app => filter === 'all' || app.status === filter)
    .filter(app => 
      app.propertyAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.loanType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationId?.includes(searchTerm)
    );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Loan Applications</h1>
          <p className="text-muted-foreground">Track and manage your loan applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-card-foreground">{applications.length}</p>
              </div>
              <FileText className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {applications.filter(a => a.status === 'approved').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {applications.filter(a => a.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500 opacity-50" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl shadow-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-card-foreground">
                  {formatCurrency(applications.reduce((sum, app) => sum + (app.loanAmount || 0), 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl shadow-lg border border-border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              {['all', 'pending', 'approved', 'rejected', 'documents', 'processing'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background"
              />
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Application ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Property</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Loan Type</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Applied On</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Update</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-muted-foreground">No applications found</p>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => {
                  const status = getStatusBadge(app.status);
                  const StatusIcon = status.icon;
                  
                  return (
                    <tr key={app.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-4">
                        <span className="font-mono text-sm text-card-foreground">
                          {app.applicationId}
                        </span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-card-foreground">{app.propertyAddress}</p>
                          <p className="text-xs text-muted-foreground">{app.propertyType}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-card-foreground">{app.loanType}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-card-foreground">
                          {formatCurrency(app.loanAmount)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.text}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDate(app.applicationDate)}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {formatDate(app.lastUpdate)}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Application Details Modal */}
        {selectedApp && (
          <ApplicationDetailsModal
            application={selectedApp}
            onClose={() => setSelectedApp(null)}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
};

export default MyApplications;