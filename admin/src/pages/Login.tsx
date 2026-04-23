import { Eye, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex w-full">
      {/* Left side - Blue gradient overlay */}
      <div className="hidden lg:flex flex-1 relative bg-blue-600 overflow-hidden items-center justify-center">
        {/* Abstract tech background patterns would be placed here via CSS or img */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%),
                              linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.4) 45%, transparent 50%)`
          }}
        />
        
        {/* We can use a pseudo background to mimic the complex image, but keeping it simple for now */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/80 to-blue-900/90 z-10" />

        <div className="z-20 flex flex-col items-center">
          <div className="flex items-center gap-2 text-white">
            <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
              <div className="flex items-end gap-1">
                <div className="w-1.5 h-3 bg-blue-600"></div>
                <div className="w-1.5 h-5 bg-teal-500"></div>
                <div className="w-1.5 h-7 bg-blue-600"></div>
              </div>
            </div>
            <span className="text-4xl font-bold tracking-tight">Hishabi</span>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 flex items-center justify-center">
                <div className="flex items-end gap-0.5">
                  <div className="w-1 h-3 bg-blue-600"></div>
                  <div className="w-1 h-5 bg-teal-500"></div>
                  <div className="w-1 h-7 bg-blue-600"></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">Hishabi</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-2">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 mt-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                  required
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch</label>
              <div className="relative">
                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600 cursor-pointer">
                  <option value="" disabled selected>Select a branch</option>
                  <option value="main">Main Branch</option>
                  <option value="dhaka">Dhaka Branch</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Remember for 30 days
              </label>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="absolute bottom-6 right-6 text-xs text-gray-400">
          © Powered by Softzino
        </div>
      </div>
    </div>
  );
};
