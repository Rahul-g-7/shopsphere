import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink mb-6">Create an account</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-body text-sm text-ink mb-1">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-coral/40"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-ink mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-coral/40"
          />
        </div>

        <div>
          <label className="block font-body text-sm text-ink mb-1">Password</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-md border border-ink/20 font-body focus:outline-none focus:ring-2 focus:ring-coral/40"
          />
        </div>

        {error && <p className="font-body text-sm text-coral">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-md bg-ink text-paper font-body font-medium hover:bg-coral transition-colors disabled:opacity-50"
        >
          {submitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="font-body text-sm text-graphite mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-coral hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
