import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as productService from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Rating from '../components/Rating';
import { useToast } from '../context/ToastContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (err) {
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItem(product._id, 1);
    addToast(`${product.name} added to cart!`);
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    setReviewLoading(true);
    try {
      await productService.createProductReview(id, { rating, comment });
      addToast('Review submitted successfully!');
      setRating(0);
      setComment('');
      // Refresh product to show new review
      const data = await productService.getProduct(id);
      setProduct(data);
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-graphite font-body">Loading...</div>;
  if (error) return <div className="text-center py-20 text-coral font-body">{error}</div>;
  if (!product) return null;

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">
        <div className="relative aspect-square bg-ink/5 rounded-lg overflow-hidden">
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs font-body uppercase tracking-wide text-graphite mt-1">
              {product.category}
            </p>
            <p className="font-display text-2xl font-semibold text-gold bg-gold/10 px-3 py-1 rounded-sm">
              ₹{product.price.toFixed(2)}
            </p>
          </div>
          <h1 className="font-display text-4xl font-semibold text-ink mb-4 leading-tight">{product.name}</h1>
          
          <div className="mb-6 border-b border-ink/10 pb-6">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>

          <p className="font-body text-ink/80 leading-relaxed mb-8">{product.description}</p>
          
          <div className="bg-white p-6 rounded-lg border border-ink/10 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-body text-graphite">Availability</span>
              <span className={`font-body font-medium ${product.stock > 0 ? 'text-sage' : 'text-coral'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full py-3.5 bg-ink text-paper rounded font-body font-medium hover:bg-ink/90 disabled:bg-graphite transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 mt-4 border-t border-ink/10">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-6">Customer Reviews</h2>
            {product.reviews.length === 0 ? (
              <p className="font-body text-graphite p-6 bg-ink/5 rounded-lg">No reviews yet. Be the first to review this product!</p>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review._id} className="bg-white p-5 rounded-lg border border-ink/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-display font-semibold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-body font-medium text-ink leading-none">{review.name}</p>
                        <p className="font-body text-xs text-graphite mt-1">{review.createdAt.substring(0, 10)}</p>
                      </div>
                    </div>
                    <Rating value={review.rating} />
                    <p className="font-body text-ink/80 mt-3">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-ink mb-6">Write a Review</h2>
            {user ? (
              <form onSubmit={submitReviewHandler} className="bg-white p-6 rounded-lg border border-ink/10">
                <div className="mb-4">
                  <label className="block font-body text-sm font-medium text-ink mb-2">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-gold/40"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block font-body text-sm font-medium text-ink mb-2">Comment</label>
                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    placeholder="What did you like or dislike?"
                    className="w-full px-4 py-3 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-gold/40"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="w-full py-3 bg-gold text-ink rounded font-body font-medium hover:bg-gold/80 disabled:opacity-50 transition-colors"
                >
                  {reviewLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-ink/5 rounded-lg font-body text-graphite">
                Please <Link to="/login" className="text-coral hover:underline font-medium">sign in</Link> to write a review.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
