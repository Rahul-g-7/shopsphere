import { useState, useEffect } from 'react';
import * as productService from '../services/productService';
import * as orderService from '../services/orderService';
import { useToast } from '../context/ToastContext';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: '', category: '', imageUrl: '', stock: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const pData = await productService.getProducts('', '', 1, 100);
      setProducts(pData.products || pData);
      
      const oData = await orderService.getOrders();
      setOrders(oData);
    } catch (err) {
      addToast('Failed to load admin data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.createProduct({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        imageUrl: newProduct.imageUrl || undefined
      });
      setNewProduct({ name: '', description: '', price: '', category: '', imageUrl: '', stock: '' });
      addToast('Product created successfully');
      fetchData();
      setActiveTab('products');
    } catch (err) {
      addToast('Failed to create product', 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.deleteProduct(id);
        addToast('Product deleted');
        fetchData();
      } catch (err) {
        addToast('Failed to delete product', 'error');
      }
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await orderService.updateOrderStatus(id, status);
      addToast('Order status updated');
      fetchData();
    } catch (err) {
      addToast('Failed to update order status', 'error');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) return <div className="text-center py-20 text-graphite font-body">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-display text-4xl font-semibold text-ink mb-8">Admin Dashboard</h1>

      <div className="flex gap-2 mb-8 border-b border-ink/10 pb-4 overflow-x-auto">
        {['dashboard', 'products', 'orders', 'add-product'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-body font-medium px-5 py-2.5 rounded-md whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-ink text-paper' : 'text-graphite hover:bg-ink/5'}`}
          >
            {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </button>
        ))}
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg border border-ink/10 shadow-sm">
            <p className="font-body text-sm text-graphite uppercase tracking-wide mb-1">Total Revenue</p>
            <p className="font-display text-4xl font-semibold text-ink">₹{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-ink/10 shadow-sm">
            <p className="font-body text-sm text-graphite uppercase tracking-wide mb-1">Total Orders</p>
            <p className="font-display text-4xl font-semibold text-ink">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-ink/10 shadow-sm">
            <p className="font-body text-sm text-graphite uppercase tracking-wide mb-1">Total Products</p>
            <p className="font-display text-4xl font-semibold text-ink">{products.length}</p>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-lg border border-ink/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ink/5 border-b border-ink/10 font-body text-sm text-graphite">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm divide-y divide-ink/5">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-ink/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded bg-ink/5" />
                    <span className="font-medium text-ink">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-graphite">{product.category}</td>
                  <td className="px-6 py-4 text-ink font-medium">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${product.stock > 10 ? 'bg-sage/20 text-sage' : product.stock > 0 ? 'bg-gold/20 text-gold' : 'bg-coral/20 text-coral'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDeleteProduct(product._id)} className="text-coral hover:underline font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && <p className="p-6 text-center text-graphite font-body">No products found.</p>}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white rounded-lg border border-ink/10 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ink/5 border-b border-ink/10 font-body text-sm text-graphite">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="font-body text-sm divide-y divide-ink/5">
              {orders.map(order => (
                <tr key={order._id} className="hover:bg-ink/5 transition-colors">
                  <td className="px-6 py-4 text-graphite font-mono text-xs">{order._id.substring(order._id.length - 8)}</td>
                  <td className="px-6 py-4 text-ink font-medium">{order.user?.name || order.user?.email || 'Unknown'}</td>
                  <td className="px-6 py-4 text-ink font-medium">₹{order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-graphite">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                      className="px-3 py-1.5 rounded border border-ink/20 font-body text-sm bg-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {orders.length === 0 && <p className="p-6 text-center text-graphite font-body">No orders found.</p>}
        </div>
      )}

      {activeTab === 'add-product' && (
        <div className="max-w-2xl bg-white p-8 rounded-lg border border-ink/10 shadow-sm">
          <h2 className="font-display text-2xl font-semibold text-ink mb-6">Create New Product</h2>
          <form onSubmit={handleCreateProduct} className="space-y-5">
            <div>
              <label className="block font-body text-sm font-medium text-ink mb-1">Product Name</label>
              <input type="text" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-ink mb-1">Description</label>
              <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" rows="4" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-sm font-medium text-ink mb-1">Price (₹)</label>
                <input type="number" required min="0" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-ink mb-1">Stock Quantity</label>
                <input type="number" required min="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-ink mb-1">Category</label>
              <input type="text" required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-ink mb-1">Image URL</label>
              <input type="url" placeholder="https://..." value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} className="w-full px-4 py-2.5 rounded border border-ink/20 font-body focus:ring-2 focus:ring-gold/40" />
            </div>
            <button type="submit" className="w-full mt-4 py-3 bg-ink text-paper rounded font-body font-medium hover:bg-ink/90 transition-colors">Create Product</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
