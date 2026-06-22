import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import * as orderService from '../services/orderService';

const CartPage = () => {
  const { cart, removeItem, refreshCart } = useCart();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const items = cart.items || [];
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError('');
    try {
      const order = await orderService.placeOrder({});
      await refreshCart();
      navigate('/orders', { state: { justPlaced: order._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place order.');
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-2xl text-ink mb-2">Your cart is empty.</h1>
        <p className="font-body text-graphite mb-6">Nothing tagged yet — go find something good.</p>
        <Link to="/" className="px-6 py-3 rounded-md bg-ink text-paper font-body hover:bg-coral transition-colors inline-block">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink mb-8">Your cart</h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4 bg-white border border-ink/10 rounded-lg p-4"
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-md bg-ink/5"
            />
            <div className="flex-1">
              <h3 className="font-display font-semibold text-ink">{item.product.name}</h3>
              <p className="font-body text-sm text-graphite">
                ₹{item.product.price.toFixed(2)} × {item.quantity}
              </p>
            </div>
            <p className="font-display font-semibold text-ink">
              ₹{(item.product.price * item.quantity).toFixed(2)}
            </p>
            <button
              onClick={() => removeItem(item.product._id)}
              className="font-body text-sm text-coral hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-ink/10 pt-6">
        <p className="font-display text-xl font-semibold text-ink">
          Total: ₹{total.toFixed(2)}
        </p>
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          className="px-6 py-3 rounded-md bg-coral text-paper font-body font-medium hover:bg-ink transition-colors disabled:opacity-50"
        >
          {placing ? 'Placing order...' : 'Place order'}
        </button>
      </div>

      {error && <p className="font-body text-sm text-coral mt-4">{error}</p>}
    </div>
  );
};

export default CartPage;
