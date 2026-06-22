import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-ink">
          ShopSphere
        </Link>

        <div className="flex items-center gap-6 font-body text-sm">
          <Link to="/" className="text-ink hover:text-coral transition-colors">
            Browse
          </Link>

          {user && (
            <Link to="/orders" className="text-ink hover:text-coral transition-colors">
              My orders
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className="text-ink hover:text-coral transition-colors">
              Admin
            </Link>
          )}

          <Link
            to="/cart"
            className="relative text-ink hover:text-coral transition-colors font-medium"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-coral text-paper text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md border border-ink/20 hover:border-coral hover:text-coral transition-colors"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-md bg-ink text-paper hover:bg-coral transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
