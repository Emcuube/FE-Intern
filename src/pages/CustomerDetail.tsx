import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, SortAsc, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CampaignSidebar from '@/components/CampaignSidebar';
import customersDetailData from '../data/customersdetail.json';
import customersData from '../data/customers.json';
import customerNotesData from '../data/customersnote.json';

const CustomerDetail = () => {
  const { customerName } = useParams();
  const [pageSize, setPageSize] = useState(50);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteForm, setNoteForm] = useState({
    contactTime: '',
    contactMethod: '',
    contactCount: '',
    customerFeedback: '',
    note: ''
  });
  
  // Find customer basic info from customers.json
  const customerBasicInfo = customersData.find(
    customer => customer.khachHang === decodeURIComponent(customerName || '')
  );

  // Find customer detailed info from customersdetail.json (using array index as identifier)
  // For now, we'll use the first entry from customersdetail.json as sample data
  const customerDetailInfo = customersDetailData[0] || {};

  // Merge customer data with proper type safety
  const customer = {
    name: customerBasicInfo?.khachHang || decodeURIComponent(customerName || ''),
    email: customerBasicInfo?.email || '',
    phoneNumber: customerBasicInfo?.soDienThoai || '',
    address: customerBasicInfo?.diaChi || '',
    district: customerBasicInfo?.quan || (customerDetailInfo as any).district || '',
    province: customerBasicInfo?.thanhPho || (customerDetailInfo as any).province || '',
    gender: (customerDetailInfo as any).gender || 'Nam',
    createdTimestamp: (customerDetailInfo as any).createdTimestamp || '2024-01-01',
    orders: (customerDetailInfo as any).orders || []
  };

  const orders = customer.orders;

  // Calculate totals
  const totalAmount = orders.reduce((sum: number, order: any) => sum + (order.price || 0) * (order.quantity || 0), 0);
  const totalOrders = orders.length;

  // Sample notes data for the right table
  const notes = [
    { id: 1, date: '2024-01-15', content: 'Khách hàng yêu cầu giao hàng vào buổi sáng' },
    { id: 2, date: '2024-01-20', content: 'Đã liên hệ xác nhận đơn hàng' },
    { id: 3, date: '2024-01-25', content: 'Khách hàng hài lòng với sản phẩm' },
  ];

  const handleAddNote = () => {
    setShowAddNoteDialog(true);
  };

  const handleSaveNote = () => {
    // Here you would typically save the note to your backend
    console.log('Saving note:', noteForm);
    setShowAddNoteDialog(false);
    setNoteForm({
      contactTime: '',
      contactMethod: '',
      contactCount: '',
      customerFeedback: '',
      note: ''
    });
  };

  const handleCloseDialog = () => {
    setShowAddNoteDialog(false);
    setNoteForm({
      contactTime: '',
      contactMethod: '',
      contactCount: '',
      customerFeedback: '',
      note: ''
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Link to="/campaign/:campaignName">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="text-xl font-semibold text-gray-900">
              {customer.name}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200 px-6 py-2 flex-shrink-0">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-gray-700">Chiến dịch</Link>
            <span>•</span>
            <span>{customer.name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Customer Info */}
          <div className="w-80 bg-white border-r border-gray-200 p-6 flex-shrink-0">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin chung</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-gray-500 block">Họ và tên</span>
                  <div className="font-medium">{customer.name}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Email</span>
                  <div className="font-medium">{customer.email}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Giới tính</span>
                  <div className="font-medium">{customer.gender}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Địa chỉ</span>
                  <div className="font-medium">{customer.address}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Số điện thoại</span>
                  <div className="font-medium">{customer.phoneNumber}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Quận</span>
                  <div className="font-medium">{customer.district}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Thành phố</span>
                  <div className="font-medium">{customer.province}</div>
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Ngày tạo</span>
                  <div className="font-medium">{customer.createdTimestamp}</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin mua hàng</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Tổng đã chi</span>
                  <div className="text-xl font-bold text-green-600">
                    {totalAmount.toLocaleString()} VND
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tổng số đơn</span>
                  <div className="font-medium">{totalOrders} đơn hàng</div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Panel - Orders List */}
          <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
            {/* Controls */}
            <div className="border-b border-gray-200 p-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <SortAsc className="h-4 w-4 mr-2" />
                    Sắp xếp
                  </Button>
                  <Input 
                    placeholder="Tìm kiếm đơn hàng" 
                    className="w-64"
                  />
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div>
                  {/* Table Header */}
                  <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 sticky top-0 z-10">
                    <div>Đơn hàng</div>
                    <div>Model</div>
                    <div>Số lượng</div>
                    <div>Giá (VND)</div>
                    <div>Tổng tiền</div>
                  </div>
                  
                  {/* Table Body */}
                  <div className="divide-y divide-gray-200">
                    {orders.length > 0 ? orders.map((order: any, index: number) => (
                      <div key={index} className="grid grid-cols-5 gap-4 p-4 hover:bg-gray-50">
                        <div className="flex flex-col">
                          <div className="font-medium text-gray-900">{order.order}</div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">{order.model}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">{order.quantity}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm">{order.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{(order.price * order.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-gray-500">
                        Chưa có đơn hàng nào
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Footer with Pagination */}
            <div className="border-t border-gray-200 flex-shrink-0">
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(parseInt(value))}>
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
                  <Button variant="outline" size="sm">
                    &lt;
                  </Button>
                  <Button variant="outline" size="sm" className="bg-orange-500 text-white border-orange-500">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    &gt;
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Customer Notes */}
          <div className="w-96 bg-white flex flex-col">
            {/* Notes Header */}
            <div className="border-b border-gray-200 p-4 flex-shrink-0">
              <h3 className="text-lg font-semibold">Ghi chú khách hàng</h3>
            </div>

            {/* Notes List with Scroll */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {customerNotesData.map((note, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      {/* Customer Name and Time */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{note.name}</span>
                        <span className="text-xs text-gray-500">1 phút trước</span>
                      </div>
                      
                      {/* Contact Details */}
                      <div className="flex items-center justify-between mb-2 text-sm">
                        <div>
                          <span className="text-gray-500">Ngày liên lạc</span>
                          <div className="text-gray-900">{note.contact_date}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-gray-500">Phản hồi</span>
                          <div className={`flex items-center ${
                            note.feedback === 'Tích cực' 
                              ? 'text-green-600' 
                              : 'text-red-600'
                          }`}>
                            <span className="mr-1">
                              {note.feedback === 'Tích cực' ? '✓' : '✗'}
                            </span>
                            {note.feedback}
                          </div>
                        </div>
                      </div>
                      
                      {/* Contact Count */}
                      <div className="mb-3 text-sm">
                        <span className="text-gray-500">Số lần và phương thức liên lạc</span>
                        <div className="text-gray-900">{note.contact_count}</div>
                      </div>
                      
                      {/* Note Content */}
                      <div className="text-sm">
                        <span className="text-gray-500">Ghi chú</span>
                        <div className="text-gray-900 mt-1">{note.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Notes Footer */}
            <div className="border-t border-gray-200 p-4 flex-shrink-0">
              <Button 
                size="sm" 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleAddNote}
              >
                Thêm ghi chú
              </Button>
            </div>
          </div>
        </div>

        {/* Add Note Dialog */}
        <Dialog open={showAddNoteDialog} onOpenChange={setShowAddNoteDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader className="flex flex-row items-center justify-between p-0">
              <DialogTitle className="text-lg font-semibold">Thêm ghi chú</DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCloseDialog}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Contact Time */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Thời gian liên hệ *
                </label>
                <Input
                  placeholder="Thời gian liên hệ"
                  value={noteForm.contactTime}
                  onChange={(e) => setNoteForm({...noteForm, contactTime: e.target.value})}
                />
              </div>

              {/* Contact Method */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Phương thức liên hệ *
                </label>
                <Select 
                  value={noteForm.contactMethod} 
                  onValueChange={(value) => setNoteForm({...noteForm, contactMethod: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phương thức..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Điện thoại</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="meeting">Gặp mặt trực tiếp</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contact Count */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Số lần liên hệ *
                </label>
                <Input
                  placeholder="Điền số lần liên hệ"
                  value={noteForm.contactCount}
                  onChange={(e) => setNoteForm({...noteForm, contactCount: e.target.value})}
                />
              </div>

              {/* Customer Feedback */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Phản hồi khách hàng *
                </label>
                <Select 
                  value={noteForm.customerFeedback} 
                  onValueChange={(value) => setNoteForm({...noteForm, customerFeedback: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn phản hồi..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Tích cực</SelectItem>
                    <SelectItem value="negative">Tiêu cực</SelectItem>
                    <SelectItem value="neutral">Trung tính</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Note */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Thêm ghi chú
                </label>
                <Textarea
                  placeholder="Thêm ghi chú..."
                  value={noteForm.note}
                  onChange={(e) => setNoteForm({...noteForm, note: e.target.value})}
                  rows={4}
                />
              </div>
            </div>

            {/* Dialog Footer */}
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={handleCloseDialog}>
                Quay lại
              </Button>
              <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={handleSaveNote}
              >
                Thêm ghi chú
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerDetail;
