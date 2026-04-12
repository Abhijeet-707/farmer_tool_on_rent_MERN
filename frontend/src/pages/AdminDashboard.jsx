import { LayoutDashboard, Tractor, Calendar, LogOut, User, Users } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const chartData = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 30 },
    { month: 'Mar', value: 20 },
    { month: 'Apr', value: 27 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 23 },
    { month: 'Jul', value: 34 }
  ];
  
  // Max value for chart scaling
  const maxVal = 40;

  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[var(--color-brand-green)] text-white flex flex-col fixed h-full z-10 shadow-xl">
        
        {/* Sidebar Logo */}
        <div className="p-6 border-b border-green-600/50 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
            <Tractor className="text-[var(--color-brand-green)]" size={30} />
          </div>
          <span className="font-bold text-2xl tracking-wide">એડમિન પેનલ</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-8 flex flex-col gap-2 px-4">
          <div className="flex items-center gap-3 bg-[var(--color-brand-yellow)] text-[var(--color-brand-green)] px-5 py-3.5 rounded-lg font-bold text-lg cursor-default shadow-md">
            <LayoutDashboard size={24} />
            ડેશબોર્ડ
          </div>
          
          <Link to="/admin-tools" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <Tractor size={24} />
            સાધનો સંચાલન
          </Link>

          <Link to="/admin-bookings" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <Calendar size={24} />
            બુકિંગ સંચાલન
          </Link>
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-green-600/50">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-white/90 hover:text-white font-bold text-xl cursor-pointer w-full"
          >
            <LogOut size={26} className="text-red-400 rotate-180" />
            લૉગઆઉટ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="bg-white h-24 shadow-sm border-b border-gray-200 px-10 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">ડેશબોર્ડ</h1>
          
          <div className="flex items-center gap-4 border border-gray-100 p-2 pr-4 rounded-full bg-gray-50/50 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
            <div className="flex flex-col items-end pl-2">
              <span className="font-bold text-gray-800 text-[15px]">Admin Access</span>
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">એડમિન</span>
            </div>
            <div className="w-12 h-12 bg-[var(--color-brand-green)] rounded-full flex items-center justify-center text-white shadow-inner">
              <User size={26} />
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-10 flex-grow bg-slate-50 relative">
          
          {/* Top Numeric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 w-full max-w-5xl">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="text-gray-900 border-2 border-gray-900 rounded-lg p-2.5 bg-gray-50">
                <Calendar size={42} strokeWidth={2.5}/>
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-bold mb-1 text-base">કુલ બુકિંગ</p>
                <h2 className="text-4xl font-black text-gray-900 leading-none">145</h2>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="text-gray-900 border-2 border-gray-900 rounded-lg p-2.5 bg-gray-50">
                <Tractor size={42} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-bold mb-1 text-base">કુલ સાધનો</p>
                <h2 className="text-4xl font-black text-gray-900 leading-none">24</h2>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="text-gray-900 border-2 border-gray-900 rounded-lg p-2.5 bg-gray-50">
                <Users size={42} strokeWidth={2.5} />
              </div>
              <div className="text-right">
                <p className="text-gray-500 font-bold mb-1 text-base flex items-center gap-1">કુલ ખેડૂત જોડાયેલ</p>
                <h2 className="text-4xl font-black text-gray-900 leading-none">312</h2>
              </div>
            </div>

          </div>

          {/* Bar Chart Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-5xl">
            <h3 className="text-lg font-extrabold text-[#2a3c5a] mb-8">માસિક બુકિંગ વિશ્લેષણ (Monthly Bookings Overview)</h3>
            
            <div className="relative pt-6 pb-2 px-12">
              
              {/* Y-Axis Labels & Grid Lines */}
              <div className="absolute top-6 left-0 h-[280px] w-full flex flex-col justify-between pointers-events-none">
                {[40, 30, 20, 10, 0].map((val) => (
                  <div key={val} className="flex items-center w-full">
                    <span className="text-[#00b050] text-sm w-10 text-right pr-4 font-semibold">{val}</span>
                    <div className="flex-1 border-t border-dashed border-gray-200 h-0"></div>
                  </div>
                ))}
              </div>

              {/* Bars */}
              <div className="relative h-[280px] w-full flex justify-around items-end z-10 pl-10 pr-6">
                {chartData.map((d) => (
                  <div key={d.month} className="flex flex-col items-center group">
                    <div 
                      className="w-14 bg-[#1e9d4a] rounded-t-sm hover:opacity-90 transition-opacity relative group" 
                      style={{ height: `${(d.value / maxVal) * 280}px` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap z-20">
                        {d.value} Bookings
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* X-Axis Labels */}
              <div className="w-full flex justify-around pl-10 pr-6 mt-4 z-10 relative border-t-2 border-transparent">
                {chartData.map(d => (
                  <span key={`label-${d.month}`} className="text-gray-500 font-medium text-sm w-14 text-center">
                    {d.month}
                  </span>
                ))}
              </div>

            </div>

            {/* Legend */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <div className="w-3.5 h-3.5 bg-[#1e9d4a] rounded-sm"></div>
              <span className="text-[#1e9d4a] font-bold text-sm">બુકિંગ (Bookings)</span>
            </div>
          </div>
          
        </main>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
