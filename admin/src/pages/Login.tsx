import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, PartyPopper, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import usersData from '../data/users.json';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [branch, setBranch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = usersData.find(u => u.email === email && u.password === password);
      if (user) {
        login({ id: user.id, name: user.name, email: user.email, role: user.role });
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white overflow-hidden">
      {/* Left Side: Illustration & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Users/softzinoacademy/.gemini/antigravity/brain/96dad7ad-329c-4948-ab86-e1ce6a087bfb/login_bg_analytics_1776947191619.png" 
            alt="Dashboard" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-blue-900/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
               <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter">NeoCommerz</h1>
          </div>
          <p className="text-emerald-100/60 text-lg font-medium max-w-md mx-auto">
            Experience the future of e-commerce administration with our professional-grade storefront management system.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-2 mb-8">
              <PartyPopper className="w-8 h-8 text-emerald-600" />
              <span className="text-2xl font-black text-gray-900 tracking-tight">NeoCommerz</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-400 font-medium text-sm">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-bold border border-red-100 text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <div className="relative group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Select Branch</label>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select a branch</option>
                  <option value="main">Main Branch</option>
                  <option value="branch1">Mirpur Branch</option>
                  <option value="branch2">Dhanmondi Branch</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
              />
              <label htmlFor="remember" className="text-sm text-gray-500 font-medium cursor-pointer">Remember for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] disabled:opacity-70 text-lg"
            >
              {loading ? 'Sign In...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-12 text-center text-gray-400 text-xs font-medium">
            © Powered by Softzino
          </p>
        </div>
      </div>
    </div>
  );
};
