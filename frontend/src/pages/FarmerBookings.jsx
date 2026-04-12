import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { Tractor, Sun, LayoutDashboard, Settings, Calendar, User, LogOut } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const FarmerBookings = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserStr = localStorage.getItem('farmerUser');
    const u = storedUserStr ? JSON.parse(storedUserStr) : { id: 2, name: 'રમેશભાઈ', full_name: 'રમેશભાઈ પટેલ' };
    setUser(u);

    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookings/user/${u.id}`);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      }
    };
    fetchUserBookings();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('farmerUser');
    navigate('/farmer-login');
  };

  const handleCancel = async (id) => {
    if (window.confirm("સુનિશ્ચિત કરો કે તમે આ બુકિંગ રદ કરવા માંગો છો?")) {
      try {
        await axios.put(`http://localhost:5000/api/bookings/${id}/status`, { status: "રદ થયેલ" });
        setBookings(bookings.map(b => b.id === id ? { ...b, status: 'રદ થયેલ' } : b));
      } catch (err) {
        console.error("Error cancelling booking:", err);
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  if (!user) return null;
  const fullName = user.full_name || user.name || 'રમેશભાઈ પટેલ';

  const getStatusPill = (status) => {
    if (status === 'મંજૂર') {
      return <span className="bg-green-200 text-green-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">મંજૂર</span>;
    } else if (status === 'પેન્ડિંગ') {
      return <span className="bg-yellow-200 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">પેન્ડિંગ</span>;
    } else if (status === 'રદ થયેલ') {
      return <span className="bg-red-300 text-red-900 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">રદ થયેલ</span>;
    }
  };

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
          <Link to="/all-equipment" className="flex items-center gap-2 text-gray-700 hover:text-[var(--color-brand-green)] cursor-pointer transition-colors">
            <Settings size={20} />
            સાધનો
          </Link>
          <div className="flex items-center gap-2 bg-green-100 text-[var(--color-brand-green)] px-4 py-2 rounded-lg cursor-default shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]">
            <Calendar size={20} />
            મારીબુકિંગ
          </div>
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
        <h1 className="text-3xl font-black text-gray-900 mb-8">મારી બુકિંગ્સ</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f0f1f1] border-b border-gray-200">
                <th className="py-5 px-6 font-bold text-gray-600 text-lg">સાધન</th>
                <th className="py-5 px-6 font-bold text-gray-600 text-lg">તારીખ અને સમય</th>
                <th className="py-5 px-6 font-bold text-gray-600 text-lg">રકમ</th>
                <th className="py-5 px-6 font-bold text-gray-600 text-lg">સ્થિતિ</th>
                <th className="py-5 px-6 font-bold text-gray-600 text-lg text-center">ક્રિયા</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 text-gray-900 font-extrabold text-lg">{booking.tool_name}</td>
                    <td className="py-5 px-6 font-medium text-[17px]">
                      <div className="text-gray-800">{formatDate(booking.booking_date)}</div>
                      <div className="text-blue-600 text-sm font-bold">{booking.booking_time} ({booking.hours} કલાક)</div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-black font-bold text-[17px]">
                        ₹{booking.total_cost}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      {getStatusPill(booking.status)}
                    </td>
                    <td className="py-5 px-6 text-center">
                      {booking.status === 'પેન્ડિંગ' && (
                        <button 
                          onClick={() => handleCancel(booking.id)}
                          className="text-red-600 font-bold hover:text-red-800 hover:underline transition-colors"
                        >
                          રદ કરો
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 font-medium text-lg">
                    તમારી પાસે હજુ સુધી કોઈ બુકિંગ નથી.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FarmerBookings;
