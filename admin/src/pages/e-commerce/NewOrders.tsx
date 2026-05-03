import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Download, MessageSquare, Package, Clock, DollarSign, User, Phone, MapPin, ShoppingBag, Truck, CheckCircle, XCircle, Check, Menu, X as CloseIcon, ArrowLeft } from 'lucide-react';
import type { Order } from '../../types/types';
import ecommerceData from '../../data/e-commerce.json';

type TabKey = 'placed' | 'packaging' | 'ready' | 'onway' | 'delivered' | 'failed';

export const NewOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabKey>('placed');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>(ecommerceData.orders as Order[]);
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

  // Tab configuration with dynamic counts
  const tabs = useMemo(() => {
    const getCount = (status: TabKey) => orders.filter(o => o.status === status).length;
    
    return [
      { key: 'placed' as TabKey, label: 'Order Placed', count: getCount('placed'), icon: ShoppingBag },
      { key: 'packaging' as TabKey, label: 'Packaging', count: getCount('packaging'), icon: Package },
      { key: 'ready' as TabKey, label: 'Ready to Ship', count: getCount('ready'), icon: CheckCircle },
      { key: 'onway' as TabKey, label: 'On the Way', count: getCount('onway'), icon: Truck },
      { key: 'delivered' as TabKey, label: 'Delivered', count: getCount('delivered'), icon: CheckCircle },
      { key: 'failed' as TabKey, label: 'Failed', count: getCount('failed'), icon: XCircle }
    ];
  }, [orders]);

  // Get status badge color
  const getStatusColor = (status: TabKey) => {
    const colors = {
      placed: 'bg-blue-50 text-blue-700 border-blue-200',
      packaging: 'bg-purple-50 text-purple-700 border-purple-200',
      ready: 'bg-orange-50 text-orange-700 border-orange-100',
      onway: 'bg-orange-50 text-orange-700 border-pending',
      delivered: 'bg-green-50 text-green-700 border-green-200',
      failed: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  // Filter orders by active tab and search term
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => order.status === activeTab)
      .filter(order => 
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [orders, activeTab, searchTerm]);

  // Calculate totals for selected order
  const orderTotals = useMemo(() => {
    if (!selectedOrder) return null;
    
    const subtotal = selectedOrder.products?.reduce((sum, p) => sum + (p.price * p.quantity), 0) || selectedOrder.amount;
    const deliveryFee = selectedOrder.deliveryFee || 0;
    const discount = selectedOrder.discount || 0;
    const total = subtotal + deliveryFee - discount;
    
    return { subtotal, deliveryFee, discount, total };
  }, [selectedOrder]);

  // Export orders function
  const handleExport = () => {
    const dataStr = JSON.stringify(filteredOrders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders-${activeTab}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${filteredOrders.length} orders successfully`);
  };

  // Handle order status change
  const handleStatusChange = (newStatus: TabKey) => {
    if (!selectedOrder) return;

    // Update orders array with new status
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus }
        : order
    );
    
    setOrders(updatedOrders);
    
    // Update selected order
    const updatedSelectedOrder = { ...selectedOrder, status: newStatus };
    setSelectedOrder(updatedSelectedOrder);
    
    // Switch to the new status tab
    setActiveTab(newStatus);
    
    // Show success message
    const statusLabels: Record<TabKey, string> = {
      placed: 'Order Placed',
      packaging: 'Packaging',
      ready: 'Ready to Ship',
      onway: 'On the Way',
      delivered: 'Delivered',
      failed: 'Failed'
    };
    
    setToast({
      show: true,
      message: `Order ${selectedOrder.orderNumber} moved to ${statusLabels[newStatus]}`,
      type: 'success'
    });
  };

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-gray-900">
                {tabs.find(t => t.key === activeTab)?.label || 'Orders'}
              </h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1 hidden sm:block">
                Manage and track your {activeTab} orders
              </p>
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

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 -mb-px overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedOrder(null);
              }}
              className={`pb-3 px-1 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.key 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              )}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Overlay */}
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
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            {/* Mobile Close Button */}
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <h2 className="font-bold text-gray-900">Orders</h2>
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
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Order List */}
          <div className="flex-1 overflow-y-auto">
            {filteredOrders.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowSidebar(false); // Close sidebar on mobile when order selected
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedOrder?.id === order.id
                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="font-bold text-sm text-gray-900">{order.orderNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-1">{order.customer.name}</p>
                    <p className="text-xs text-gray-500 mb-2">{order.customer.phone}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{order.orderDate}</span>
                      <span className="text-sm font-black text-green-600">৳{order.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <Package className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">No Order Found</h3>
                <p className="text-sm text-gray-500">
                  {searchTerm 
                    ? 'No order found matching your search criteria.' 
                    : `No ${activeTab} orders at the moment.`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content - Order Details */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          {selectedOrder ? (
            <div className="w-full h-full overflow-y-auto p-4 md:p-6">
              {/* Mobile Back Button */}
              <button
                onClick={() => setSelectedOrder(null)}
                className="lg:hidden flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 font-bold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Orders
              </button>
              <div className="max-w-3xl mx-auto">
                {/* Order Header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-black text-gray-900 mb-1">{selectedOrder.orderNumber}</h2>
                      <p className="text-sm text-gray-500">{selectedOrder.orderDate}</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Items</p>
                        <p className="text-sm font-black text-gray-900">{selectedOrder.items} items</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Amount</p>
                        <p className="text-sm font-black text-green-600">৳{selectedOrder.amount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-bold">Payment</p>
                        <p className="text-sm font-black text-gray-900">{selectedOrder.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products List */}
                {selectedOrder.products && selectedOrder.products.length > 0 && (
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                    <h3 className="text-sm font-black text-gray-900 uppercase mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.products.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-sm">{product.name}</p>
                            <p className="text-xs text-gray-500">Quantity: {product.quantity}</p>
                          </div>
                          <p className="font-black text-gray-900">৳{(product.price * product.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                    {selectedOrder.customer.address && (
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">Delivery Address</p>
                          <p className="text-sm font-bold text-gray-900">{selectedOrder.customer.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <h3 className="text-sm font-black text-gray-900 uppercase mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Subtotal ({selectedOrder.items} items)</span>
                      <span className="font-bold text-gray-900">৳{(orderTotals?.subtotal || selectedOrder.amount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-bold">Delivery Fee</span>
                      <span className="font-bold text-gray-900">৳{(orderTotals?.deliveryFee || 0).toLocaleString()}</span>
                    </div>
                    {orderTotals && orderTotals.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 font-bold">Discount</span>
                        <span className="font-bold text-red-600">-৳{orderTotals.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="font-black text-gray-900">Total Amount</span>
                      <span className="font-black text-green-600 text-lg">
                        ৳{(orderTotals?.total || selectedOrder.amount).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedOrder.status === 'placed' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('packaging')}
                        className="btn-success py-3 rounded-xl"
                      >
                        Start Packaging
                      </button>
                      <button 
                        onClick={() => handleStatusChange('failed')}
                        className="btn-danger-ghost py-3 rounded-xl"
                      >
                        Cancel Order
                      </button>
                    </>
                  )}
                  {selectedOrder.status === 'packaging' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('ready')}
                        className="btn-success py-3 rounded-xl"
                      >
                        Mark as Ready
                      </button>
                      <button 
                        onClick={() => handleStatusChange('placed')}
                        className="btn-secondary py-3 rounded-xl"
                      >
                        Back to Placed
                      </button>
                    </>
                  )}
                  {selectedOrder.status === 'ready' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('onway')}
                        className="btn-success py-3 rounded-xl"
                      >
                        Ship Order
                      </button>
                      <button 
                        onClick={() => handleStatusChange('packaging')}
                        className="btn-secondary py-3 rounded-xl"
                      >
                        Back to Packaging
                      </button>
                    </>
                  )}
                  {selectedOrder.status === 'onway' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange('delivered')}
                        className="btn-success py-3 rounded-xl"
                      >
                        Mark as Delivered
                      </button>
                      <button 
                        onClick={() => handleStatusChange('failed')}
                        className="btn-danger-ghost py-3 rounded-xl"
                      >
                        Mark as Failed
                      </button>
                    </>
                  )}
                  {(selectedOrder.status === 'delivered' || selectedOrder.status === 'failed') && (
                    <button 
                      onClick={() => showToast('Invoice printed successfully')}
                      className="col-span-2 btn-primary py-3 rounded-xl"
                    >
                      Print Invoice
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">No Order Selected</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Please select an order from the list on the left to view its details.
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
              ? 'bg-green-50 border-green-100 text-green-800' 
              : 'bg-red-50 border-red-100 text-red-800'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              toast.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <Check className="w-5 h-5" />
            </div>
            <p className="font-bold text-sm">{toast.message}</p>
            <button 
              onClick={() => setToast({ ...toast, show: false })}
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
