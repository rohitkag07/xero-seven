import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader } from 'lucide-react';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const inputVariants = {
  focus: { scale: 1.01, transition: { duration: 0.2 } },
};

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { signUp, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  const validatePassword = (pwd: string) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  const isPasswordValid = validatePassword(password);
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isPasswordValid) {
      setError('Password must be at least 8 characters with uppercase, lowercase, and number');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, fullName, company);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] flex items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Success glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 0.6 }}
          >
            <CheckCircle size={72} className="text-green-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Account Created!</h2>
          <p className="text-zinc-400 mb-6">Welcome to Xero Seven. Redirecting...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#050505] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Ethereal glass background */}
      <motion.div
        className="absolute w-96 h-96 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
          bottom: '-10%',
          left: '-5%',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1], rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariants}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Xero Seven</h1>
          <p className="text-zinc-400">AI-Powered Agency Platform</p>
        </div>

        {/* Signup Card */}
        <div className="p-1.5 rounded-3xl bg-white/[0.02] border border-white/5">
        <div className="bg-white/3 backdrop-blur-xl border border-white/8 rounded-[calc(1.5rem-0.375rem)] p-8 md:p-10 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Get Started</h2>
          <p className="text-zinc-400 text-sm mb-6">Create your account in seconds</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-zinc-200 mb-2">
                Full Name
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
                required
                className="w-full px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition disabled:opacity-50"
              />
            </div>

            {/* Company Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-zinc-200 mb-2">
                Company (Optional)
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
                disabled={loading}
                className="w-full px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition disabled:opacity-50"
              />
            </div>

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
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                {password.length > 0 ? (
                  isPasswordValid ? (
                    <span className="text-green-400">✓ Password is strong</span>
                  ) : (
                    <span className="text-yellow-400">Must be 8+ chars with uppercase, lowercase, number</span>
                  )
                ) : (
                  'Password must be at least 8 characters'
                )}
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-200 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  required
                  className="w-full px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-300"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && (
                <p className="text-xs mt-1">
                  {passwordsMatch ? (
                    <span className="text-green-400">✓ Passwords match</span>
                  ) : (
                    <span className="text-red-400">Passwords do not match</span>
                  )}
                </p>
              )}
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
              disabled={loading || !isPasswordValid || !passwordsMatch}
              className="w-full bg-gradient-to-r from-accent/80 to-accent hover:from-accent hover:to-accent/90 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader size={18} className="animate-spin" />}
              {loading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col items-center gap-3">
            <p className="text-center text-sm text-zinc-400">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition">
                Sign in here
              </Link>
            </p>
            {/* ADMIN BYPASS */}
            <Link 
              to="/dashboard" 
              className="text-[10px] uppercase tracking-widest text-zinc-600 hover:text-emerald-500 transition-all font-bold"
            >
              (Admin) Bypass to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>

      {/* Footer Note */}
      <p className="text-center text-xs text-zinc-500 mt-6 relative z-10">
        Your data is secure and encrypted with InsForge
      </p>
    </div>
  );
}
