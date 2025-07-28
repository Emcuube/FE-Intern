import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Search, Edit } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import customersData from '../data/customers.json';

const Customers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

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

  // Filter customers based on search term
  const filteredCustomers = customersData.filter(customer =>
    customer.khachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.soDienThoai.includes(searchTerm) ||
    customer.diaChi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleCustomerClick = (customerName: string) => {
    navigate(`/customer/${encodeURIComponent(customerName)}`);
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

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CampaignSidebar />
      
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Danh sách khách hàng</h1>
              <p className="text-sm text-gray-500">Khách hàng • Danh sách khách hàng</p>
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
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
                    <p className="text-sm text-gray-600">Danh sách khách hàng</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Mô tả chung</p>
                    <p className="text-sm text-gray-600">
                      Danh sách khách hàng với thông tin liên hệ, địa chỉ và thông tin cơ bản. 
                      Dữ liệu được cập nhật thường xuyên để đảm bảo tính chính xác.
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tổng khách hàng</p>
                    <p className="text-sm text-gray-600">{customersData.length} khách hàng</p>
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
                                <p 
                                  className="font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                                  onClick={() => handleCustomerClick(customer.khachHang)}
                                >
                                  {customer.khachHang}
                                </p>
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
    </div>
  );
};

export default Customers;