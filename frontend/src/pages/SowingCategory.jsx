import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Tractor, Sun, LayoutDashboard, Settings, Calendar, User, LogOut, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const SowingCategory = () => {
  const [user, setUser] = useState(null);
  const [tools, setTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('farmerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ name: 'રમેશભાઈ', full_name: 'રમેશભાઈ પટેલ' });
    }

    const fetchTools = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tools');
        setTools(res.data.filter(t => t.category.toLowerCase() === 'sowing' || t.category === 'વાવણી સાધન'));
      } catch (error) {
         console.error("Error fetching tools", error);
      }
    };
    fetchTools();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('farmerUser');
    navigate('/farmer-login');
  };

  if (!user) return null;
  const fullName = user.full_name || user.name || 'રમેશભાઈ પટેલ';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e6fcf0]">
      
      {/* Header */}
      <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-[var(--color-brand-green)] flex items-center justify-center relative bg-white">
            <Sun className="text-yellow-500 absolute -top-1 -right-1 bg-white rounded-full" size={16} />
            <Tractor className="text-[var(--color-brand-green)]" size={28} />
          </div>
          <div className="font-bold text-xl leading-tight">
            <span className="text-[var(--color-brand-green)] font-extrabold uppercase block">ખેડૂત સાધન</span>
            <span className="text-red-500 text-sm">બુકિંગ(ભાડે)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="hidden md:flex items-center gap-8 font-semibold">
          <Link to="/farmer-dashboard" className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-brand-green)] cursor-pointer transition-colors">
            <LayoutDashboard size={20} />
            ડેશબોર્ડ
          </Link>
          <div className="flex items-center gap-2 bg-green-100 text-[var(--color-brand-green)] px-4 py-2 rounded-lg cursor-pointer">
            <Settings size={20} />
            સાધનો
          </div>
          <Link to="/my-bookings" className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-brand-green)] cursor-pointer transition-colors">
            <Calendar size={20} />
            મારીબુકિંગ
          </Link>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="font-bold text-gray-800 text-sm">{fullName}</span>
            <span className="text-gray-500 text-xs font-semibold uppercase">ખેડૂત</span>
          </div>
          <div className="w-10 h-10 bg-[var(--color-brand-green)] rounded-full flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 transition-colors ml-2">
            <LogOut size={24} strokeWidth={2.5} />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">વાવણી સાધન</h1>
          <p className="text-gray-500 font-semibold text-lg drop-shadow-sm">તમારી જરૂરિયાત મુજબ શ્રેષ્ઠ સાધનો પસંદ કરો</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tractor) => (
            <div key={tractor.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-all pt-6 p-4">
              <div className="h-44 flex items-center justify-center mb-4">
                <img src={tractor.image} alt={tractor.name} className="h-full object-contain mix-blend-multiply" />
              </div>
              
              <div className="px-4 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-gray-900 mb-1">{tractor.name}</h3>
                <div className="flex items-center text-gray-500 mb-6 drop-shadow-sm">
                  <MapPin size={16} className="text-red-500 mr-1" />
                  <span className="text-[15px] font-medium">{tractor.location}</span>
                </div>
                
                <div className="flex justify-between bg-gray-50/80 rounded-xl p-4 mb-6">
                  <div className="text-center w-full">
                    <p className="text-gray-400 text-sm font-semibold mb-1">પ્રતિ કલાક</p>
                    <p className="text-[var(--color-brand-green)] text-xl font-black">₹{tractor.price_hour}</p>
                  </div>
                  <div className="text-center w-full">
                    <p className="text-gray-400 text-sm font-semibold mb-1">પ્રતિ દિવસ</p>
                    <p className="text-[var(--color-brand-green)] text-xl font-black">₹{tractor.price_day}</p>
                  </div>
                </div>
                
                <Link to="/tool-details" state={{ tool: { ...tractor, priceHour: `₹${tractor.price_hour}`, priceDay: `₹${tractor.price_day}` } }} className="w-full border-2 border-[var(--color-brand-green)] text-[var(--color-brand-green)] font-extrabold text-lg flex items-center justify-center py-3 rounded-xl hover:bg-green-50 transition-colors">
                  વિગતો જુઓ
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SowingCategory;
