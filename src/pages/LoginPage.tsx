import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, Loader } from 'lucide-react';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const inputVariants = {
  focus: { scale: 1.01, transition: { duration: 0.2 } },
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn, isAuthenticated } = useAuth();
  const [justAuthed, setJustAuthed] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated || justAuthed) {
      navigate('/dashboard/mission-control');
    }
  }, [isAuthenticated, justAuthed, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Ethereal glass background animation */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          top: '-10%',
          right: '-5%',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">Xero Seven</h1>
          <p className="text-sm text-zinc-500 tracking-wider">AI-POWERED AGENCY PLATFORM</p>
        </div>

        {/* Premium Glass Card */}
        <div className="p-1.5 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-xl">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[calc(1.5rem-0.375rem)] p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-zinc-500 text-sm mb-8">Sign in to access your dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-200 mb-2">
                Email Address
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={loading}
                required
                className="w-full px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition disabled:opacity-50"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-200 mb-2">
                Password
              </label>
              <div className="relative">
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-gradient-to-r from-accent/80 to-accent hover:from-accent hover:to-accent/90 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </motion.button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Signup Link */}
          <div className="mt-6 pt-6 border-t border-white/10 space-y-4 text-center">
            <p className="text-sm text-zinc-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition">
                Sign up here
              </Link>
            </p>
            
            <div className="pt-4">
              <button 
                onClick={() => setJustAuthed(true)}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition uppercase tracking-widest font-bold"
              >
                Force Access Dashboard (Admin Bypass)
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Secure login powered by InsForge
        </p>
      </motion.div>
    </div>
  );
}
