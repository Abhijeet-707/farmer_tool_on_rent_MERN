import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Tractor, Sun, LayoutDashboard, Settings, Calendar, User, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const FarmerDashboard = () => {
  const [user, setUser] = useState(null);
  const [popularTools, setPopularTools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('farmerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser({ name: 'ખેડૂત મિત્ર' });
    }

    const fetchPopularTools = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tools');
        const popular = response.data.filter(t => t.is_popular === true);
        setPopularTools(popular);
      } catch (error) {
        console.error("Error fetching popular tools:", error);
      }
    };
    
    fetchPopularTools();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('farmerUser');
    navigate('/farmer-login');
  };

  if (!user) return null;
  const firstName = user.name?.split(' ')[0] || 'ખેડૂત';
  const fullName = user.name || 'ખેડૂત મિત્ર';

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e6fcf0]">
      
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

        <div className="hidden md:flex items-center gap-8 font-semibold">
          <div className="flex items-center gap-2 bg-green-100 text-[var(--color-brand-green)] px-4 py-2 rounded-lg cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <LayoutDashboard size={20} />
            ડેશબોર્ડ
          </div>
          <Link to="/all-equipment" className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-brand-green)] cursor-pointer transition-colors">
            <Settings size={20} />
            સાધનો
          </Link>
          <Link to="/my-bookings" className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-brand-green)] cursor-pointer transition-colors">
            <Calendar size={20} />
            મારીબુકિંગ
          </Link>
        </div>

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

      <main className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full">
        
        <div className="bg-[#2e7d32] rounded-2xl p-8 mb-10 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-center">
          <div className="relative z-10 w-full">
            <h1 className="text-[2.5rem] font-black mb-2 tracking-tight">નમસ્તે, {firstName}</h1>
            <p className="text-green-100 text-lg font-medium mb-8">તમારા ખેતર માટે આધુનિક સાધનો સરળતાથી ભાડે મેળવો</p>
            
            <Link to="/all-equipment" className="bg-[#fce38a] hover:bg-[#fbd348] text-[#1a1a1a] font-extrabold text-[15px] px-8 py-3.5 rounded-lg transition-all shadow-md active:scale-95 inline-block text-center w-max">
              બધા સાધનો જુઓ
            </Link>
          </div>
          
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none hidden md:block">
            <Tractor size={200} className="translate-y-4 translate-x-10" />
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-black mb-6">શ્રેણીઓ (Categories)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <Link to="/tractor" className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-gray-100 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/farmer_images/John deere 5310.jpg" alt="Tractor" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-gray-800 text-lg">ટ્રેક્ટર</span>
            </Link>

            <Link to="/sowing" className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-gray-100 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/farmer_images/Seed cum Fertilizer Drill_.jpg" alt="Sowing" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-gray-800 text-lg">વાવણી સાધન</span>
            </Link>

            <Link to="/pruning" className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-gray-100 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/farmer_images/Combine Harvester_.jpg" alt="Harvesting" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-gray-800 text-lg">કાપણી સાધન</span>
            </Link>

            <Link to="/thresher" className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-[3px] border-gray-100 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img src="/farmer_images/Electric Corn Threshr_.jpg" alt="Thresher" className="w-full h-full object-cover" />
              </div>
              <span className="font-extrabold text-gray-800 text-lg">થ્રેશર</span>
            </Link>

          </div>
        </div>

        <div className="mb-0">
          <h2 className="text-2xl font-bold text-black mb-6">લોકપ્રિય સાધનો</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {popularTools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-full h-56 bg-[#f4f7f5] flex items-center justify-center overflow-hidden border-b border-gray-100">
                  <img 
                    src={tool.image} 
                    alt={tool.name} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply p-2 transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-500 font-medium text-sm flex-grow mb-6 leading-relaxed">
                    {tool.description}
                  </p>
                  <Link 
                    to="/tool-details" 
                    state={{ tool: { ...tool, priceHour: `₹${tool.price_hour}`, priceDay: `₹${tool.price_day}` } }} 
                    className="w-full border-2 border-[var(--color-brand-green)] text-[var(--color-brand-green)] font-bold py-2.5 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
                  >
                    વિગતો જુઓ
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default FarmerDashboard;
