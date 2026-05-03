import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, MessageSquare, XCircle, Calendar, DollarSign, User, Phone, AlertCircle, Check, Menu, X as CloseIcon, ArrowLeft } from 'lucide-react';
import type { CanceledOrder } from '../../types/types';
import ecommerceData from '../../data/e-commerce.json';

type CancelFilterKey = 'all' | 'customer' | 'admin' | 'system';

export const CanceledOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState<CancelFilterKey>('all');
  const [selectedOrder, setSelectedOrder] = useState<CanceledOrder | null>(null);
  const [orders] = useState<CanceledOrder[]>(ecommerceData.canceledOrders as CanceledOrder[]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  // Auto hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Filter configuration with dynamic counts
  const filters = useMemo(() => {
    const getCount = (type: CancelFilterKey) => 
      type === 'all' ? orders.length : orders.filter(o => o.canceledBy === type).length;
    
    return [
      { key: 'all' as CancelFilterKey, label: 'All Cancellations', count: getCount('all') },
      { key: 'customer' as CancelFilterKey, label: 'By Customer', count: getCount('customer') },
      { key: 'admin' as CancelFilterKey, label: 'By Admin', count: getCount('admin') },
      { key: 'system' as CancelFilterKey, label: 'By System', count: getCount('system') }
    ];
  }, [orders]);

  const getCanceledByColor = (canceledBy: string) => {
    const colors = {
      customer: 'bg-orange-50 text-orange-700 border-pending',
      admin: 'bg-purple-50 text-purple-700 border-purple-200',
      system: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[canceledBy as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => filterBy === 'all' || order.canceledBy === filterBy)
      .filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [orders, filterBy, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    return {
      total: orders.length,
      byCustomer: orders.filter(o => o.canceledBy === 'customer').length,
      byAdmin: orders.filter(o => o.canceledBy === 'admin').length,
      totalAmount
    };
  }, [orders]);

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredOrders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `canceled-orders-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setToast({ show: true, message: `Exported ${filteredOrders.length} canceled orders`, type: 'success' });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">Canceled Orders</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 hidden sm:block">Track and analyze canceled orders</p>
            </div>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="font-bold text-sm hidden sm:inline">Export List</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div className="bg-red-50 rounded-lg p-3 border border-red-100">
            <p className="text-xs font-bold text-red-600 mb-1">Total Canceled</p>
            <p className="text-2xl font-black text-red-700">{stats.total}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-pending-light">
            <p className="text-xs font-bold text-orange-600 mb-1">By Customer</p>
            <p className="text-2xl font-black text-orange-700">{stats.byCustomer}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
            <p className="text-xs font-bold text-secondary mb-1">By Admin</p>
            <p className="text-2xl font-black text-purple-700">{stats.byAdmin}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <p className="text-xs font-bold text-gray-600 mb-1">Lost Revenue</p>
            <p className="text-2xl font-black text-gray-700">৳{stats.totalAmount.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 border-b border-gray-200 -mb-px overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setFilterBy(filter.key);
                setSelectedOrder(null);
              }}
              className={`pb-3 px-1 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                filterBy === filter.key
                  ? 'text-red-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                filterBy === filter.key 
                  ? 'bg-red-50 text-red-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {filter.count}
              </span>
              {filterBy === filter.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Left Sidebar - Order List */}
        <div className={`
          w-80 bg-white border-r border-gray-200 flex flex-col
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <h2 className="font-bold text-gray-900">Canceled Orders</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Order no. / Phone no."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-red-200 focus:ring-1 focus:ring-danger"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredOrders.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowSidebar(false);
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedOrder?.id === order.id
                        ? 'bg-red-50 border-l-4 border-l-danger'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-sm text-gray-900">{order.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getCanceledByColor(order.canceledBy)}`}>
                        {order.canceledBy.charAt(0).toUpperCase() + order.canceledBy.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">{order.customer.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{order.customer.phone}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{order.canceledDate}</span>
                      <span className="text-sm font-black text-red-600">৳{order.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <XCircle className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">No Canceled Orders</h3>
                <p className="text-sm text-gray-500">
                  {searchTerm ? 'No orders found matching your search.' : 'No canceled orders at the moment.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content - Order Details */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          {selectedOrder ? (
            <div className="w-full h-full overflow-y-auto p-4 md:p-6">
              <button
                onClick={() => setSelectedOrder(null)}
                className="lg:hidden flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 font-bold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Orders
              </button>
              <div className="max-w-3xl mx-auto">
                {/* Cancellation Alert */}
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-black text-red-700 mb-1">Order Canceled</p>
                    <p className="text-sm text-red-700 font-bold">{selectedOrder.cancelReason}</p>
                  </div>
                </div>

                {/* Order Header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-black text-gray-900 mb-1">{selectedOrder.orderNumber}</h2>
                      <p className="text-sm text-gray-500">Ordered: {selectedOrder.orderDate}</p>
                      <p className="text-sm text-red-600 font-bold">Canceled: {selectedOrder.canceledDate}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getCanceledByColor(selectedOrder.canceledBy)}`}>
                      Canceled by {selectedOrder.canceledBy.charAt(0).toUpperCase() + selectedOrder.canceledBy.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Items</p>
                        <p className="text-sm font-black text-gray-900">{selectedOrder.items} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Lost Amount</p>
                        <p className="text-sm font-black text-red-600">৳{selectedOrder.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase mb-4">Customer Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold mb-1">Customer Name</p>
                        <p className="text-sm font-bold text-gray-900">{selectedOrder.customer.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold mb-1">Phone Number</p>
                        <p className="text-sm font-bold text-gray-900">{selectedOrder.customer.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cancellation Details */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase mb-4">Cancellation Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Canceled By:</span>
                      <span className="font-bold text-gray-900 capitalize">{selectedOrder.canceledBy}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Cancellation Date:</span>
                      <span className="font-bold text-gray-900">{selectedOrder.canceledDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Reason:</span>
                      <span className="font-bold text-gray-900">{selectedOrder.cancelReason}</span>
                    </div>
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="font-black text-gray-900">Lost Revenue:</span>
                      <span className="font-black text-red-600 text-lg">৳{selectedOrder.amount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => setToast({ show: true, message: 'Order details archived', type: 'success' })}
                  className="w-full btn-secondary py-3 rounded-xl"
                >
                  Archive Order
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">No Order Selected</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Please select a canceled order from the list on the left to view its details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${
            toast.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <Check className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm">{toast.message}</p>
            <button 
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
