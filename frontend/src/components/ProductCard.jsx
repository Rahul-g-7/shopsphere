import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <Link
      to={`/products/${product._id}`}
      className="group block relative bg-white rounded-lg border border-ink/10 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="relative aspect-square bg-ink/5 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-body uppercase tracking-wide text-graphite mt-1">
            {product.category}
          </p>
          <p className="font-display font-semibold text-ink text-lg bg-gold/20 px-2 rounded-sm text-gold">
            ₹{product.price.toFixed(2)}
          </p>
        </div>
        <h3 className="font-display text-lg font-semibold text-ink leading-snug">
          {product.name}
        </h3>
        <div className="mt-2 mb-1">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <p className="font-body text-sm text-graphite mt-2">
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
