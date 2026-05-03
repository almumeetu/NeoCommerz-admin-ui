import { useState, useMemo, useEffect } from 'react';
import { Search, MessageSquare, Star, ThumbsUp, User, Calendar, Check, X, Menu, X as CloseIcon, ArrowLeft } from 'lucide-react';
import type { Review } from '../../types/types';
import ecommerceData from '../../data/e-commerce.json';

type StatusFilterKey = 'all' | 'pending' | 'approved' | 'rejected';

// Update types to include product-based reviews
interface ProductReviews {
  productId: string;
  productName: string;
  totalReviews: number;
  averageRating: number;
  reviews: Review[];
}

export const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusFilterKey>('all');
  const [showSidebar, setShowSidebar] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(ecommerceData.reviews as Review[]);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
    show: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Group reviews by product
  const productReviews = useMemo(() => {
    const grouped = reviews.reduce((acc, review) => {
      if (!acc[review.product]) {
        acc[review.product] = {
          productId: review.id,
          productName: review.product,
          totalReviews: 0,
          averageRating: 0,
          reviews: []
        };
      }
      acc[review.product].reviews.push(review);
      acc[review.product].totalReviews++;
      return acc;
    }, {} as Record<string, ProductReviews>);

    // Calculate average ratings
    Object.values(grouped).forEach(product => {
      const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
      product.averageRating = sum / product.reviews.length;
    });

    return Object.values(grouped);
  }, [reviews]);

  // Filter products by search
  const filteredProducts = useMemo(() => {
    return productReviews.filter(product =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productReviews, searchTerm]);

  // Get filtered reviews across all products based on status
  const filteredReviewsByStatus = useMemo(() => {
    if (filterStatus === 'all') {
      return reviews;
    }
    return reviews.filter(r => r.status === filterStatus);
  }, [reviews, filterStatus]);

  // Get selected product reviews with status filter
  const selectedProductReviews = useMemo(() => {
    if (!selectedProduct) return null;
    const product = productReviews.find(p => p.productName === selectedProduct);
    if (!product) return null;
    
    // Filter by status if not 'all'
    if (filterStatus === 'all') return product;
    
    return {
      ...product,
      reviews: product.reviews.filter(r => r.status === filterStatus),
      totalReviews: product.reviews.filter(r => r.status === filterStatus).length
    };
  }, [selectedProduct, productReviews, filterStatus]);

  // Calculate overall stats
  const stats = useMemo(() => {
    const total = reviews.length;
    const pending = reviews.filter(r => r.status === 'pending').length;
    const approved = reviews.filter(r => r.status === 'approved').length;
    const rejected = reviews.filter(r => r.status === 'rejected').length;
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';
    
    return { total, pending, approved, rejected, avgRating };
  }, [reviews]);

  // Status filters - show counts based on selected product or overall
  const statusFilters = useMemo(() => {
    if (selectedProduct) {
      const product = productReviews.find(p => p.productName === selectedProduct);
      if (product) {
        const productStats = {
          total: product.reviews.length,
          pending: product.reviews.filter(r => r.status === 'pending').length,
          approved: product.reviews.filter(r => r.status === 'approved').length,
          rejected: product.reviews.filter(r => r.status === 'rejected').length
        };
        return [
          { key: 'all' as const, label: 'All Reviews', count: productStats.total },
          { key: 'pending' as const, label: 'Pending', count: productStats.pending },
          { key: 'approved' as const, label: 'Approved', count: productStats.approved },
          { key: 'rejected' as const, label: 'Rejected', count: productStats.rejected }
        ];
      }
    }
    return [
      { key: 'all' as const, label: 'All Reviews', count: stats.total },
      { key: 'pending' as const, label: 'Pending', count: stats.pending },
      { key: 'approved' as const, label: 'Approved', count: stats.approved },
      { key: 'rejected' as const, label: 'Rejected', count: stats.rejected }
    ];
  }, [stats, selectedProduct, productReviews]);

  const handleStatusFilterChange = (status: StatusFilterKey) => {
    setFilterStatus(status);
    // Clear product selection when changing status to show all reviews with that status
    setSelectedProduct(null);
  };

  const handleApprove = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'approved' as const } : r));
    setToast({ show: true, message: 'Review approved successfully', type: 'success' });
  };

  const handleReject = (reviewId: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'rejected' as const } : r));
    setToast({ show: true, message: 'Review rejected', type: 'success' });
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
              <h1 className="text-xl md:text-2xl font-black text-gray-900">Reviews</h1>
              <p className="text-xs md:text-sm text-gray-500 mt-1">Manage your customers</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <p className="text-xs font-bold text-blue-600 mb-1">Total Reviews</p>
            <p className="text-2xl font-black text-blue-700">{stats.total}</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
            <div className="flex items-center gap-2">
              <div>
                <p className="text-xs font-bold text-orange-600 mb-1">Avg Rating</p>
                <p className="text-2xl font-black text-orange-700">{stats.avgRating}</p>
              </div>
              <Star className="w-5 h-5 fill-warning text-orange-600" />
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3 border border-pending-100">
            <p className="text-xs font-bold text-orange-600 mb-1">Pending</p>
            <p className="text-2xl font-black text-orange-700">{stats.pending}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-100">
            <p className="text-xs font-bold text-green-600 mb-1">Approved</p>
            <p className="text-2xl font-black text-green-700">{stats.approved}</p>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-3 border-b border-gray-200 -mb-px overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleStatusFilterChange(filter.key)}
              className={`pb-3 px-1 text-sm font-bold transition-colors relative whitespace-nowrap flex items-center gap-2 ${
                filterStatus === filter.key
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                filterStatus === filter.key 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {filter.count}
              </span>
              {filterStatus === filter.key && (
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

        {/* Left Sidebar - Product List */}
        <div className={`
          w-64 bg-white border-r border-gray-200 flex flex-col
          fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3 lg:hidden">
              <h2 className="font-bold text-gray-900">Products</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-200 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1 overflow-y-auto">
            {filteredProducts.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <div
                    key={product.productName}
                    onClick={() => {
                      setSelectedProduct(product.productName);
                      setShowSidebar(false);
                    }}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedProduct === product.productName
                        ? 'bg-blue-50 border-l-4 border-l-blue-600'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="font-bold text-sm text-gray-900 mb-2 line-clamp-2">
                      {product.productName}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(product.averageRating)
                                ? 'fill-warning text-orange-600'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-600">
                        {product.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {product.totalReviews} {product.totalReviews === 1 ? 'review' : 'reviews'}
                      </span>
                      <div className="flex gap-1">
                        {product.reviews.filter(r => r.status === 'pending').length > 0 && (
                          <span className="px-1.5 py-0.5 bg-orange-50 text-orange-700 rounded text-xs font-bold">
                            {product.reviews.filter(r => r.status === 'pending').length}
                          </span>
                        )}
                        {product.reviews.filter(r => r.status === 'approved').length > 0 && (
                          <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded text-xs font-bold">
                            {product.reviews.filter(r => r.status === 'approved').length}
                          </span>
                        )}
                        {product.reviews.filter(r => r.status === 'rejected').length > 0 && (
                          <span className="px-1.5 py-0.5 bg-red-50 text-red-700 rounded text-xs font-bold">
                            {product.reviews.filter(r => r.status === 'rejected').length}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">No Products Found</h3>
                <p className="text-sm text-gray-500">
                  No products found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content - Reviews */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          {selectedProductReviews ? (
            <div className="w-full h-full overflow-y-auto p-4 md:p-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="lg:hidden flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 font-bold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Products
              </button>

              <div className="max-w-4xl mx-auto">
                {/* Product Header */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
                  <h2 className="text-xl font-black text-gray-900 mb-3">
                    {selectedProductReviews.productName}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.round(selectedProductReviews.averageRating)
                                ? 'fill-warning text-orange-600'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-black text-gray-900 text-lg">
                        {selectedProductReviews.averageRating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 font-bold">
                      {selectedProductReviews.totalReviews} {selectedProductReviews.totalReviews === 1 ? 'review' : 'reviews'}
                    </span>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {selectedProductReviews.reviews.length > 0 ? (
                    selectedProductReviews.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-black text-gray-900">{review.customer.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              review.status === 'approved' 
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : review.status === 'pending'
                                ? 'bg-orange-50 text-orange-700 border-orange-100'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-warning text-orange-600'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-black text-gray-900">{review.rating}.0</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-bold">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="font-bold">{review.helpful} helpful</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {review.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => handleApprove(review.id)}
                            className="flex-1 btn-success py-2 px-4 rounded-lg"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="flex-1 btn-danger py-2 px-4 rounded-lg"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {review.status === 'approved' && (
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="w-full sm:flex-1 btn-danger-ghost py-2 px-4 rounded-lg"
                          >
                            Remove Review
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
                      <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-900 mb-2">No Reviews Found</h3>
                      <p className="text-sm text-gray-500">
                        No {filterStatus !== 'all' ? filterStatus : ''} reviews for this product.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : filteredReviewsByStatus.length > 0 ? (
            <div className="w-full h-full overflow-y-auto p-4 md:p-6">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-black text-gray-900 mb-2">
                    {filterStatus === 'all' ? 'All Reviews' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Reviews`}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Showing {filteredReviewsByStatus.length} {filteredReviewsByStatus.length === 1 ? 'review' : 'reviews'}
                  </p>
                </div>

                {/* Reviews List - All Products */}
                <div className="space-y-4">
                  {filteredReviewsByStatus.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                    >
                      {/* Product Name Badge */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold border border-blue-200">
                          {review.product}
                        </span>
                      </div>

                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-black text-gray-900">{review.customer.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                              review.status === 'approved' 
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : review.status === 'pending'
                                ? 'bg-orange-50 text-orange-700 border-orange-100'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-warning text-orange-600'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-black text-gray-900">{review.rating}.0</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-bold">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="font-bold">{review.helpful} helpful</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {review.status === 'pending' && (
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => handleApprove(review.id)}
                            className="flex-1 btn-success py-2 px-4 rounded-lg"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="flex-1 btn-danger py-2 px-4 rounded-lg"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {review.status === 'approved' && (
                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => handleReject(review.id)}
                            className="w-full sm:flex-1 btn-danger-ghost py-2 px-4 rounded-lg"
                          >
                            Remove Review
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-black text-gray-900 mb-2">No Reviews Found</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                No {filterStatus !== 'all' ? filterStatus : ''} reviews available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
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
              {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
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
