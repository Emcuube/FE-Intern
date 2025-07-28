import React, { useState, useEffect } from 'react';
import { Search, Edit, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import CampaignSidebar from '@/components/CampaignSidebar';

interface Customer {
  khachHang: string;
  email: string;
  soDienThoai: string;
  diaChi: string;
  quan: string;
  thanhPho: string;
}

const Prospects = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fileName: 'Danh sách tiềm năng',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum sed ipsum sem pellentesque dignissim quam ullamcorper ac. Donec elementum cursur nec dapibus. Etiam rhoncus tellus est quam gravida.'
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

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetch('/customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error loading customers:', error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer =>
    customer.khachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.soDienThoai.includes(searchTerm) ||
    customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const getRandomDate = () => {
    const start = new Date(2018, 0, 1);
    const end = new Date(2023, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toLocaleDateString('vi-VN');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
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
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <CampaignSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CampaignSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Danh sách tiềm năng</h1>
              <p className="text-sm text-gray-500">Tiềm năng • Danh sách khách hàng</p>
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
                    <p className="text-sm text-gray-600">{editFormData.fileName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mô tả chung</p>
                    <p className="text-sm text-gray-600">
                      {editFormData.description}
                    </p>
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
                  placeholder="Tìm kiếm khách hàng"
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
                          <Checkbox />
                        </TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Số điện thoại</TableHead>
                        <TableHead>Địa chỉ</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCustomers.map((customer, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${avatarColors[(startIndex + index) % avatarColors.length]}`}>
                                <span className="text-white text-xs font-medium">
                                  {customer.khachHang.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <button
                                  onClick={() => navigate(`/customer/${encodeURIComponent(customer.khachHang)}`)}
                                  className="font-medium text-gray-900 hover:text-blue-600 hover:underline text-left"
                                >
                                  {customer.khachHang}
                                </button>
                                <p className="text-sm text-gray-500">{customer.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{customer.soDienThoai}</TableCell>
                          <TableCell>
                            <div>
                              <p className="text-gray-900">{customer.diaChi}</p>
                              <p className="text-sm text-gray-500">{customer.quan} • {customer.thanhPho}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-600">{getRandomDate()}</TableCell>
                        </TableRow>
                      ))}
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
                    Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} của {filteredCustomers.length} khách hàng
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

      {/* Edit Prospects File Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tệp tiềm năng mới</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Tên tệp <span className="text-red-500">*</span>
              </label>
              <Input
                value={editFormData.fileName}
                onChange={(e) => handleEditFormChange('fileName', e.target.value)}
                className="mt-1"
                placeholder="{{tenTep}}"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700">
                Mô tả tệp <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 relative">
                <Textarea
                  value={editFormData.description}
                  onChange={(e) => handleEditFormChange('description', e.target.value)}
                  placeholder="{{moTaTep}}"
                  className="resize-none"
                  rows={4}
                  maxLength={100}
                />
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">
                  {editFormData.description.length}/100
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Quay lại
            </Button>
            <Button onClick={handleSaveChanges} className="bg-gray-900 hover:bg-gray-800">
              Lưu chỉnh sửa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Prospects;