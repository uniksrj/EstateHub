import { useState } from 'react';
import { MoreHorizontal, Edit, Trash2, Mail, UserCheck, UserX, Search, Filter } from 'lucide-react';
import { superAdminAPI } from '@/services/api';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { filterOptions } from '@/data/userType';
import { DialogBox } from '@/components/common/DialogBox';
import { getRoleColor, getStatusInfo } from '@/utils/userHelpers';

export default function UserManagementTable({ user_list }) {
  const [users, setUsers] = useState(user_list);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || user.role_id.toString() === selectedRole;
    const matchesStatus = selectedStatus === 'All' || user.is_active == selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  console.log("paginatedUsers", paginatedUsers);

  const handleDeleteUser = async (userId) => {
    try {
      if (confirm('Are you sure you want to delete this user?')) {
        await superAdminAPI.deleteUser(userId);
        toast.success('User deleted successfully');
        setUsers(users.filter(user => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error('Failed to delete user');
      return;
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await superAdminAPI.changeUserStatus(userId, newStatus);
      toast.success(response.data.message || 'User status updated successfully');
      setUsers(users.map(user =>
        user.id === userId ? { ...user, is_active: newStatus } : user
      ));
    } catch (error) {
      console.error("Error changing user status:", error);
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">User Management</h3>
        <DialogBox isNew={'yes'} />
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-card px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions.roles.map((role, index) => (
              <option key={role.value} value={role.value}>{role.label}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-card px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {filterOptions.statuses.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Role</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Properties</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Join Date</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Last Login</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                    {user.is_verified && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Verified</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role_id)}`}>
                    {user.role.display_name}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusInfo(user).color}`}>
                    {getStatusInfo(user).text}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="text-foreground font-medium">{user.properties}</div>
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-muted-foreground">
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleString()
                    : 'Never'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(user.id, user.is_active == '1' ? '0' : '1')}
                      className="p-1 hover:bg-muted rounded"
                      title={user.is_active == '1' ? 'Suspend User' : 'Activate User'}
                    >
                      {user.is_active != '1' ? <UserX className="h-4 w-4 text-red-500" /> : <UserCheck className="h-4 w-4 text-green-500" />}
                    </button>
                    <button className="p-1 hover:bg-muted rounded" title="Send Email">
                      <Mail className="h-4 w-4 text-blue-500" />
                    </button>
                    <DialogBox user={user} />
                    {/* <button className="p-1 hover:bg-muted rounded" title="Edit User">
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button> */}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 hover:bg-muted rounded"
                      title="Delete User"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-card px-2 py-1 border border-border rounded text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm ${currentPage === page
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}