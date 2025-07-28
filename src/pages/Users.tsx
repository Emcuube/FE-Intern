import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import CampaignSidebar from '@/components/CampaignSidebar';
import usersData from '../../user.json';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });

  // Array of colors for avatar dots
  const avatarColors = [
    'bg-red-500',
    'bg-yellow-500', 
    'bg-blue-500',
    'bg-black',
    'bg-pink-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-purple-500',
    'bg-indigo-500'
  ];

  // Filter users based on search term
  const filteredUsers = usersData.filter(user =>
    user["Nhân viên"].toLowerCase().includes(searchTerm.toLowerCase()) ||
    user["Số điện thoại"].includes(searchTerm) ||
    user["Vai trò"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(paginatedUsers.map((_, index) => `${startIndex + index}`));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const getRandomDate = () => {
    const start = new Date(2018, 0, 1);
    const end = new Date(2023, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('vi-VN');
  };

  const handleEditFormChange = (field: string, value: string) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    setIsEditDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditFormData({
      name: '',
      email: '',
      phoneNumber: ''
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CampaignSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Danh sách người dùng</h1>
              <p className="text-sm text-gray-500">Người dùng • Danh sách nhân viên</p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={handleEditClick}
            >
              <Edit className="w-4 h-4" />
              <span>Chỉnh sửa</span>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex">
          {/* Left Panel */}
          <div className="w-80 bg-white border-r border-gray-200 p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Thông tin chung</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tên tệp</p>
                    <p className="text-sm text-gray-600">Danh sách người dùng</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mô tả chung</p>
                    <p className="text-sm text-gray-600">
                      Danh sách nhân viên trong hệ thống với thông tin vai trò, liên hệ và 
                      quyền truy cập. Dữ liệu được quản lý và cập nhật bởi admin.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tổng người dùng</p>
                    <p className="text-sm text-gray-600">{usersData.length} nhân viên</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-3">
            {/* Search Bar */}
            <div className="mb-3">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm nhân viên"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <div className="max-h-[600px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-gray-50 z-10">
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox 
                            checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead>Nhân viên</TableHead>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user, index) => {
                        const userId = `${startIndex + index}`;
                        const isSelected = selectedUsers.includes(userId);
                        
                        return (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell>
                              <Checkbox 
                                checked={isSelected}
                                onCheckedChange={() => handleSelectUser(userId)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${avatarColors[(startIndex + index) % avatarColors.length]}`}>
                                  <span className="text-white text-xs font-medium">
                                    {user["Nhân viên"].charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <Link 
                                    to={`/user/${encodeURIComponent(user["Nhân viên"])}`}
                                    className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                                  >
                                    {user["Nhân viên"]}
                                  </Link>
                                  <p className="text-sm text-gray-500">
                                    {user["Nhân viên"].toLowerCase().replace(/\s+/g, '.') + '@xiaomi.com'}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant={user["Vai trò"] === "Admin" ? "default" : "secondary"}
                                className={user["Vai trò"] === "Admin" ? "bg-orange-100 text-orange-800" : ""}
                              >
                                {user["Vai trò"]}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{user["Số điện thoại"]}</TableCell>
                            <TableCell className="text-gray-600">{getRandomDate()}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <select 
                    value={itemsPerPage} 
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                  <span className="text-sm text-gray-600">mục trên mỗi trang</span>
                  <span className="text-sm text-gray-500">
                    Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} của {filteredUsers.length} nhân viên
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </Button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    if (totalPages <= 5) {
                      return (
                        <Button 
                          key={pageNum}
                          variant="outline" 
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                          className={currentPage === pageNum ? "bg-blue-50 text-blue-600 border-blue-200" : ""}
                        >
                          {pageNum}
                        </Button>
                      );
                    }
                    return null;
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="text-sm text-gray-600">...</span>
                      <Button variant="outline" size="sm">{totalPages}</Button>
                    </>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success notification (positioned absolutely) */}
      {selectedUsers.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span>Đã chọn {selectedUsers.length} nhân viên</span>
        </div>
      )}

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Tên nhân viên <span className="text-red-500">*</span>
              </label>
              <Input
                value={editFormData.name}
                onChange={(e) => handleEditFormChange('name', e.target.value)}
                className="mt-1"
                placeholder="{{tenNhanVien}}"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={editFormData.email}
                onChange={(e) => handleEditFormChange('email', e.target.value)}
                className="mt-1"
                placeholder="{{email}}"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <Input
                value={editFormData.phoneNumber}
                onChange={(e) => handleEditFormChange('phoneNumber', e.target.value)}
                className="mt-1"
                placeholder="{{phoneNumber}}"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSaveChanges} className="bg-gray-900 hover:bg-gray-800">
              Lưu thay đổi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;