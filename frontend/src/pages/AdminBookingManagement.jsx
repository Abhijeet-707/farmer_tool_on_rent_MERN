import { useState, useEffect } from 'react';
import { LayoutDashboard, Tractor, Calendar, LogOut, User, Check, X, Phone, Trash2, MapPin } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AdminBookingManagement = () => {
  const navigate = useNavigate();
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookingsList(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status: newStatus });
      fetchBookings();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    if(window.confirm("સુનિશ્ચિત કરો કે તમે આ બુકિંગ ડીલીટ કરવા માંગો છો?")) {
      try {
        await axios.delete(`http://localhost:5000/api/bookings/${id}`);
        fetchBookings();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const getStatusColor = (status) => {
    if (status === 'મંજૂર') return 'bg-green-200 text-green-800';
    if (status === 'પેન્ડિંગ') return 'bg-yellow-200 text-yellow-800';
    if (status === 'રદ થયેલ') return 'bg-red-200 text-red-800';
    return 'bg-gray-200 text-gray-800';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-[var(--color-brand-green)] text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-6 border-b border-green-600/50 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
            <Tractor className="text-[var(--color-brand-green)]" size={30} />
          </div>
          <span className="font-bold text-2xl tracking-wide">એડમિન પેનલ</span>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-2 px-4">
          <Link to="/admin-dashboard" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <LayoutDashboard size={24} />
            ડેશબોર્ડ
          </Link>
          
          <Link to="/admin-tools" className="flex items-center gap-3 text-white/80 hover:bg-green-800/50 hover:text-white px-5 py-3.5 rounded-lg font-medium text-lg cursor-pointer transition-colors">
            <Tractor size={24} />
            સાધનો સંચાલન
          </Link>

          <div className="flex items-center gap-3 bg-[var(--color-brand-yellow)] text-[var(--color-brand-green)] px-5 py-3.5 rounded-lg font-bold text-lg shadow-md cursor-default">
            <Calendar size={24} />
            બુકિંગ સંચાલન
          </div>
        </nav>

        <div className="p-6 border-t border-green-600/50">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white/90 hover:text-white font-bold text-xl cursor-pointer w-full">
            <LogOut size={26} className="text-red-400 rotate-180" />
            લૉગઆઉટ
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-[280px] flex flex-col min-h-screen">
        
        <header className="bg-white h-24 shadow-sm border-b border-gray-200 px-10 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">બુકિંગ સંચાલન</h1>
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

        <main className="p-10 flex-grow bg-slate-50 relative">
          <div className="w-full max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
              
              <div className="grid grid-cols-8 bg-[#f4f4f4] border-b border-gray-200 p-4 text-gray-500 font-semibold text-lg text-center items-center">
                <div className="text-left pl-4">બુકિંગ ID</div>
                <div className="text-left">ખેડૂત</div>
                <div className="text-left">સરનામું</div>
                <div className="text-left">સાધન</div>
                <div>તારીખ અને સમય</div>
                <div>કુલ કિંમત</div>
                <div>સ્થિતિ</div>
                <div>ક્રિયા</div>
              </div>

              <div className="divide-y divide-gray-200">
                {bookingsList.map((booking) => (
                  <div key={booking.id} className="grid grid-cols-8 p-4 text-center items-center hover:bg-gray-50 transition-colors">
                    
                    <div className="text-left pl-4 font-semibold text-gray-400 text-xl">
                      #{booking.id}
                    </div>
                    
                    <div className="text-left flex flex-col justify-center gap-1.5">
                      <span className="font-bold text-gray-900 text-[15px]">{booking.renter_name}</span>
                      <div className="flex items-center text-gray-500 text-[12px] font-semibold">
                        <Phone size={12} className="mr-1.5 text-blue-500" />
                        {booking.renter_mobile}
                      </div>
                    </div>

                    <div className="text-left text-gray-700 font-medium text-[14px] pr-2 min-w-0">
                      <div className="flex items-start">
                        <MapPin size={16} className="mr-1.5 mt-0.5 shrink-0 text-red-500" />
                        <span className="leading-snug break-all">{booking.address}</span>
                      </div>
                    </div>
                    
                    <div className="text-left font-bold text-gray-800 text-[15px]">
                      {booking.tool_name}
                    </div>
                    
                    <div className="flex flex-col text-[14px] font-bold gap-1 items-center justify-center">
                      <span className="text-gray-900 border-b border-gray-200 pb-1 w-max">{formatDate(booking.booking_date)}</span>
                      <span className="text-blue-600">{booking.booking_time} ({booking.hours} કલાક)</span>
                    </div>

                    <div className="flex justify-center items-center">
                      <span className="text-black font-bold text-lg">
                        ₹{booking.total_cost}
                      </span>
                    </div>
                    
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold w-max ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2 justify-center items-center">
                      {booking.status === 'પેન્ડિંગ' ? (
                        <div className="flex flex-col gap-2 w-[70px]">
                          <button onClick={() => handleStatusChange(booking.id, 'મંજૂર')} className="bg-[#00b050] hover:bg-green-600 text-white flex items-center justify-center gap-1 text-xs py-1 rounded shadow-sm font-semibold transition-colors">
                            <Check size={14} /> મંજૂર
                          </button>
                          <button onClick={() => handleStatusChange(booking.id, 'રદ થયેલ')} className="bg-[#fbb4b4] hover:bg-[#faa1a1] text-[#902929] flex items-center justify-center gap-1 text-xs py-1 rounded shadow-sm border border-[#e89191] font-semibold transition-colors">
                            <X size={14} /> રદ
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 text-[13px] font-semibold">
                            {booking.status === 'મંજૂર' ? 'મંજૂર કરેલ' : 'રદ કરેલ'}
                          </span>
                          <button onClick={() => handleDeleteBooking(booking.id)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-1.5 rounded-full transition-colors ml-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminBookingManagement;
