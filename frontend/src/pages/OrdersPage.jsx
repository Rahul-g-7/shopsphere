import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as orderService from '../services/orderService';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  pending: 'bg-gold/20 text-gold',
  processing: 'bg-coral/20 text-coral',
  shipped: 'bg-sage/20 text-sage',
  delivered: 'bg-ink/20 text-ink',
  cancelled: 'bg-graphite/20 text-graphite',
};

const OrdersPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to fetch orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-20 text-graphite font-body">Loading orders...</div>;
  if (error) return <div className="text-center py-20 text-coral font-body">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink mb-2">My Orders</h1>
      {location.state?.justPlaced && (
        <div className="mb-6 p-4 bg-sage/10 border border-sage/20 text-sage font-body rounded-md">
          Order successfully placed! Thank you for shopping.
        </div>
      )}

      {orders.length === 0 ? (
        <p className="font-body text-graphite py-10">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-ink/10 rounded-lg p-6">
              <div className="flex justify-between items-start border-b border-ink/10 pb-4 mb-4">
                <div>
                  <p className="font-body text-sm text-graphite mb-1">
                    Order #{order._id.substring(order._id.length - 8)}
                  </p>
                  <p className="font-body text-sm text-graphite">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusColors[order.status] || 'bg-ink/10 text-ink'}`}>
                  {order.status}
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center font-body text-sm">
                    <span className="text-ink">{item.quantity}x {item.name}</span>
                    <span className="text-graphite">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-ink/10 flex justify-between items-center">
                <span className="font-display font-semibold text-ink">Total</span>
                <span className="font-display font-semibold text-ink">₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
