import { useState, useEffect } from 'react';
import * as productService from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async (searchTerm = '', categoryFilter = '', pageNum = 1) => {
    setLoading(true);
    setError('');
    try {
      const data = await productService.getProducts(searchTerm, categoryFilter, pageNum);
      if (data.products) {
        setProducts(data.products);
        setPage(data.page);
        setTotalPages(data.pages);
      } else {
        setProducts(data);
      }
    } catch (err) {
      setError('Could not load products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(search, category, page);
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts(search, category, 1);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-ink text-paper py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-start">
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight max-w-3xl">
            Premium goods, curated for modern living.
          </h1>
          <p className="font-body text-paper/80 text-xl mb-10 max-w-2xl">
            Discover our collection of high-quality electronics, accessories, and apparel designed to elevate your everyday routine.
          </p>
          <a
            href="#shop"
            className="bg-gold text-ink font-body font-semibold px-8 py-3.5 rounded-sm hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            Start Shopping
          </a>
        </div>
      </div>

      <div id="shop" className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="font-display text-4xl font-semibold text-ink mb-2">
            The Collection
          </h2>
          <p className="font-body text-graphite">Browse the shop floor, piece by piece.</p>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-gold/40"
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-8 py-3 rounded-md bg-ink text-paper font-body font-medium hover:bg-ink/80 transition-colors"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-graphite font-body py-10 text-center text-lg">Loading products...</p>}
        {error && <p className="text-coral font-body py-10 text-center">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24 border border-ink/10 rounded-lg bg-white">
            <p className="font-display text-2xl text-ink mb-2">No products found.</p>
            <p className="font-body text-graphite">Try a different search or check back later.</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-6 mt-16">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 border border-ink/20 rounded font-body text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/5 font-medium transition-colors"
            >
              Previous
            </button>
            <span className="font-body text-graphite font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 border border-ink/20 rounded font-body text-ink disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/5 font-medium transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
