import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Trash2, Calendar } from 'lucide-react';
import CampaignSidebar from '@/components/CampaignSidebar';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CampaignSettings = () => {
  const { campaignName } = useParams();
  const [selectedOption, setSelectedOption] = useState('custom');
  const [selectedSegment, setSelectedSegment] = useState('existingSegment');
  const [filters, setFilters] = useState([
    { field: 'area', operator: 'is', value: 'Hà Nội' },
    { field: 'phone', operator: 'contains', value: '' },
    { field: 'gender', operator: 'is', value: 'Nữ' },
    { field: 'date', operator: 'from', value: '13/06/2024' },
    { field: 'property', operator: 'is', value: '' }
  ]);

  const addFilter = () => {
    setFilters([...filters, { field: 'area', operator: 'is', value: '' }]);
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const updateFilter = (index: number, field: string, value: string) => {
    const newFilters = [...filters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setFilters(newFilters);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CampaignSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-4">
            <Link to={`/campaign/${encodeURIComponent(campaignName || '')}`}>
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
              Chia sẻ
            </Button>
            <Button variant="outline" size="sm">
              Chỉnh sửa
            </Button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng doanh thu</div>
              <div className="text-2xl font-semibold text-green-600">↗ 12 tỷ VND</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Tổng số khách hàng</div>
              <div className="text-2xl font-semibold text-red-600">↓ 243,002</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Số sản phẩm</div>
              <div className="text-2xl font-semibold text-gray-700">– 1,588</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Phần trăm mua hàng</div>
              <div className="text-2xl font-semibold text-green-600">↗ 23%</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 flex-shrink-0">
          <div className="flex space-x-8">
            <Link 
              to={`/campaign/${encodeURIComponent(campaignName || '')}`}
              className="py-3 px-1 text-gray-500 hover:text-gray-700"
            >
              Tổng quan
            </Link>
            <button className="py-3 px-1 text-gray-500 hover:text-gray-700">
              Khách hàng
            </button>
            <button className="py-3 px-1 border-b-2 border-orange-500 text-orange-600 font-medium">
              Cài đặt
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 bg-white">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8">Cài đặt chiến dịch</h2>
            
            {/* Customer File Selection */}
            <div className="mb-8">
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700">
                  Chọn tệp khách hàng <span className="text-red-500">*</span>
                </span>
              </div>
              
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
                <div className={`flex items-start space-x-3 p-4 border-2 rounded-lg ${selectedOption === 'existing' ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="existing" id="existing" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="existing" className="font-medium text-gray-900 cursor-pointer">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-sm"></div>
                        </div>
                        <span>Chọn tệp khách có sẵn</span>
                      </div>
                      <div className="text-sm text-gray-600">Sử dụng tệp khách hàng có sẵn</div>
                    </Label>
                  </div>
                </div>
                
                <div className={`flex items-start space-x-3 p-4 border-2 rounded-lg ${selectedOption === 'custom' ? 'border-orange-200 bg-orange-50' : 'border-gray-200'}`}>
                  <RadioGroupItem value="custom" id="custom" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="custom" className="font-medium text-gray-900 cursor-pointer">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span>Tùy chỉnh điều kiện</span>
                      </div>
                      <div className="text-sm text-gray-600">Tạo tệp mới từ bộ lọc khách hàng</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Segment Selection or Custom Conditions */}
            {selectedOption === 'existing' ? (
              <div className="mb-8">
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Chọn phân khúc <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="{existingSegment}" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="existingSegment">{'{existingSegment}'}</SelectItem>
                      <SelectItem value="segment1">Phân khúc 1</SelectItem>
                      <SelectItem value="segment2">Phân khúc 2</SelectItem>
                      <SelectItem value="segment3">Phân khúc 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <span className="text-sm text-gray-500">hoặc</span>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Tải lên
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="mb-4">
                  <span className="text-sm text-gray-700">
                    Khớp <strong>tất cả</strong> các mục sau đây:
                  </span>
                </div>
                
                <div className="space-y-3">
                  {filters.map((filter, index) => (
                    <div key={index} className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-3">
                        <Select
                          value={filter.field}
                          onValueChange={(value) => updateFilter(index, 'field', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="area">Khu vực</SelectItem>
                            <SelectItem value="phone">Số điện thoại</SelectItem>
                            <SelectItem value="gender">Giới tính</SelectItem>
                            <SelectItem value="date">Ngày</SelectItem>
                            <SelectItem value="property">Thuộc tính</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-3">
                        <Select
                          value={filter.operator}
                          onValueChange={(value) => updateFilter(index, 'operator', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="is">là</SelectItem>
                            <SelectItem value="contains">có bắt kỳ giá trị nào</SelectItem>
                            <SelectItem value="from">từ ngày</SelectItem>
                            <SelectItem value="to">đến ngày</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="col-span-5">
                        {filter.field === 'date' ? (
                          <div className="relative">
                            <Input
                              type="text"
                              value={filter.value}
                              onChange={(e) => updateFilter(index, 'value', e.target.value)}
                              placeholder="dd/mm/yyyy"
                            />
                            <Calendar className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                          </div>
                        ) : filter.field === 'gender' ? (
                          <Select
                            value={filter.value}
                            onValueChange={(value) => updateFilter(index, 'value', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nam">Nam</SelectItem>
                              <SelectItem value="Nữ">Nữ</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : filter.field === 'area' ? (
                          <Select
                            value={filter.value}
                            onValueChange={(value) => updateFilter(index, 'value', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                              <SelectItem value="TP.HCM">TP.HCM</SelectItem>
                              <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                              <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={filter.value}
                            onChange={(e) => updateFilter(index, 'value', e.target.value)}
                            placeholder="Nhập giá trị"
                          />
                        )}
                      </div>
                      
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFilter(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  variant="ghost"
                  onClick={addFilter}
                  className="mt-4 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm điều kiện
                </Button>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Tổng số khách hàng</div>
                <div className="text-3xl font-bold text-gray-900">12,442</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Tổng số đơn đã chốt</div>
                <div className="text-3xl font-bold text-gray-900">33,454</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSettings;