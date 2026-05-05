import { useState } from 'react';
import Footer from '../components/Footer';
import { Tractor, ArrowLeft, TriangleAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', { username: mobile, password });
      if (response.data.success) {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'લૉગિન નિષ્ફળ. સાચા માહિતી દાખલ કરો.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#131b28]">
      
      {/* Top Bar with Back Arrow */}
      <div className="p-6">
        <Link to="/" className="text-white hover:text-gray-300 transition-colors inline-block">
          <ArrowLeft size={28} strokeWidth={3} />
        </Link>
      </div>
      
      <main className="flex-grow flex items-center justify-center px-4 pb-12">
        <div className="bg-white rounded-[1.25rem] shadow-2xl w-full max-w-lg p-10 relative">
          
          <div className="flex justify-center mb-6">
            <div className="w-[84px] h-[84px] bg-[var(--color-brand-green)] rounded-full flex items-center justify-center">
              <Tractor className="text-white" size={44} strokeWidth={1.5} />
            </div>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-wide">એડમિન લૉગિન</h1>
            <p className="text-gray-500 text-[15px] font-medium">કૃપા કરીને તમારા ખાતામાં લૉગિન કરો</p>
          </div>

          <div className="bg-[#fffdf0] border border-[#fce38a] rounded p-3 flex gap-3 items-center mb-8">
            <TriangleAlert className="text-[#ff4d4f] shrink-0" size={24} strokeWidth={1.5} />
            <p className="text-[#ff4d4f] text-[15px] font-medium tracking-wide">આ વિભાગ માત્ર અધિકૃત એડમિન માટે છે.</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">મોબાઇલ નંબર / ID</label>
              <input 
                type="text" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800"
              />
            </div>
            
            <div>
              <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">પાસવર્ડ</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800"
              />
            </div>

            <button type="submit" className="w-full bg-[var(--color-brand-green)] text-white py-3.5 rounded font-bold text-lg hover:bg-green-800 transition-colors shadow-[0_4px_6px_rgba(0,100,0,0.3)] mt-2">
              લૉગિન કરો
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
