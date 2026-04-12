import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Tractor, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [village, setVillage] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/register', { fullName, village, mobile, password });
      if (res.status === 200) {
        // Automatically save to local storage and redirect to dashboard
        localStorage.setItem('farmerUser', JSON.stringify({
           id: res.data.user.id,
           name: res.data.user.full_name,
           role: 'farmer'
        }));
        navigate('/farmer-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'નોંધણી નિષ્ફળ. ફરી પ્રયાસ કરો.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--color-brand-light)]">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden border border-gray-100">
          {/* Thick green top border */}
          <div className="h-3 bg-[var(--color-brand-green)] w-full"></div>
          
          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center gap-1 mb-6">
              <div className="relative flex items-center gap-3">
                <div className="w-14 h-14 rounded-full border-2 border-[var(--color-brand-green)] flex items-center justify-center relative">
                  <Sun className="text-yellow-500 absolute -top-2 -right-2 bg-white rounded-full" size={20} />
                  <Tractor className="text-[var(--color-brand-green)]" size={32} />
                </div>
                <div className="font-bold text-xl leading-tight">
                  <span className="text-[var(--color-brand-green)] font-extrabold uppercase block">ખેડૂત સાધન</span>
                  <span className="text-red-500 text-sm">બુકિંગ(ભાડે)</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">નોંધણી કરો</h1>
              <p className="text-gray-500 text-[15px] font-medium">કૃપા કરીને નવું ખાતું બનાવો</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded border border-red-200 text-sm text-center font-medium">
                {error}
              </div>
            )}

            <form className="space-y-5" onSubmit={handleRegister}>
              <div>
                <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">પૂરું નામ</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=""
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">ગામ / શહેર</label>
                <input 
                  type="text" 
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder=""
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">મોબાઇલ નંબર</label>
                <input 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder=""
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800 placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-[#1a1a1a] font-semibold text-[15px] mb-2">પાસવર્ડ</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] focus:ring-1 focus:ring-[var(--color-brand-green)] text-gray-800 placeholder-gray-400"
                />
              </div>

              <button type="submit" className="w-full bg-[var(--color-brand-green)] text-white py-3.5 rounded font-bold text-lg hover:bg-green-800 transition-colors mt-2 shadow-[0_4px_6px_rgba(0,100,0,0.3)]">
                નોંધણી કરો
              </button>
            </form>

            <hr className="my-8 border-gray-300" />

            <p className="text-center text-gray-700 font-medium">
              પહેલેથી જ ખાતું છે? <Link to="/farmer-login" className="text-[var(--color-brand-green)] font-bold hover:underline underline-offset-2">લૉગિન કરો</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
