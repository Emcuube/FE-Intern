
import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Share, Copy, Settings } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import customersData from '../data/customers.json';

const CampaignDetail = () => {
  const { campaignName } = useParams();
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: campaignName ? decodeURIComponent(campaignName) : '',
    type: 'email',
    description: ''
  });

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm.trim()) return customersData;
    
    return customersData.filter(customer => 
      customer.khachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.soDienThoai.includes(searchTerm) ||
      customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.quan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.thanhPho.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageCustomers = useMemo(() => {
    return filteredCustomers.slice(startIndex, endIndex);
  }, [filteredCustomers, startIndex, endIndex]);

  const handlePageSizeChange = (newPageSize: string) => {
    setPageSize(parseInt(newPageSize));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
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

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-xl font-semibold text-gray-900">
              {campaignName ? decodeURIComponent(campaignName) : 'Chi tiết chiến dịch'}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Chia sẻ
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
              <Settings className="h-4 w-4" />
              Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 flex-shrink-0">
          <div className="flex space-x-8">
            <button className="py-3 px-1 border-b-2 border-orange-500 text-orange-600 font-medium">
              Tổng quan
            </button>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-700">
              Báo cáo
            </button>
            <Link 
              to={`/campaign/${encodeURIComponent(campaignName || '')}/settings`}
              className="py-3 px-1 text-gray-500 hover:text-gray-700"
            >
              Cài đặt
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Campaign Info */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 flex-shrink-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Thông tin chung</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Tên chiến dịch</span>
                  <div className="font-medium">{campaignName ? decodeURIComponent(campaignName) : 'Chiến dịch mới'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Loại chiến dịch</span>
                  <div className="font-medium">Chiến dịch email</div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Mô tả chung</span>
                  <div className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis sem risus, eu dignissim quam ullamcorper ac. Donec efficiend consectetur dapibus. In auctor tellus id quam gravida.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Customer List */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Search and Controls */}
            <div className="border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Danh sách khách hàng</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Tìm kiếm khách hàng" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Scrollable Customer Table */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div>
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 sticky top-0 z-10">
                    <div>Khách hàng</div>
                    <div>Số điện thoại</div>
                    <div>Địa chỉ</div>
                    <div></div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {currentPageCustomers.map((customer, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm">
                            {customer.khachHang.charAt(0)}
                          </div>
                          <div>
                            <Link 
                              to={`/customer/${encodeURIComponent(customer.khachHang)}`}
                              className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                            >
                              {customer.khachHang}
                            </Link>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-900">
                          {customer.soDienThoai}
                        </div>
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {customer.diaChi}
                            <br />
                            {customer.quan} • {customer.thanhPho}
                          </div>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Fixed Footer with Pagination */}
            <div className="border-t border-gray-200 flex-shrink-0">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">mục trên mỗi trang</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    &lt;
                  </Button>
                  
                  {generatePageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === '...' ? (
                        <span className="text-sm text-gray-500">...</span>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className={currentPage === page ? "bg-orange-500 text-white border-orange-500" : ""}
                          onClick={() => setCurrentPage(page as number)}
                        >
                          {page}
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa chiến dịch</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-4">Thông tin chung</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Tên chiến dịch <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={editFormData.name}
                    onChange={(e) => handleEditFormChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="{{tenChienDich}}"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Loại chiến dịch <span className="text-red-500">*</span>
                  </label>
                  <Select value={editFormData.type} onValueChange={(value) => handleEditFormChange('type', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="{{loaiChienDich}}" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Chiến dịch Email</SelectItem>
                      <SelectItem value="sms">Chiến dịch SMS</SelectItem>
                      <SelectItem value="social">Chiến dịch Social Media</SelectItem>
                      <SelectItem value="print">Chiến dịch In ấn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Mô tả chiến dịch <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 relative">
                    <Textarea
                      value={editFormData.description}
                      onChange={(e) => handleEditFormChange('description', e.target.value)}
                      placeholder="{{mofaChienDich}}"
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

export default CampaignDetail;
