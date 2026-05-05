import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ToolBooking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tool = location.state?.tool || {
    id: 1,
    name: "John Deere 5310",
    image: "https://images.unsplash.com/photo-1592982537447-6f23f8b54964?auto=format&fit=crop&q=80&w=800",
    location: "રાજકોટ",
    priceHour: "₹800",
    priceDay: "₹6000"
  };

  const [hours, setHours] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');

  // Extract numeric price safely blocking calculation glitches
  const rawPriceStr = (tool.priceHour || tool.price_hour || '800').toString().replace(/[^0-9.]/g, '');
  const priceNumeric = Math.round(Number(rawPriceStr)) || 800;
  
  const totalAmount = priceNumeric * hours;

  const handleConfirm = async () => {
    if (!date || !time || !address) {
      alert("કૃપા કરીને બધી વિગતો ભરો.");
      return;
    }

    try {
      const storedUserStr = localStorage.getItem('farmerUser');
      const storedUser = storedUserStr ? JSON.parse(storedUserStr) : { id: 2 }; // Fallback to id 2 (dummy farmer)

      const payload = {
        tool_id: tool.id,
        renter_id: storedUser.id || 2,
        booking_date: date,
        booking_time: time,
        hours: hours,
        address: address,
        total_cost: totalAmount
      };

      await axios.post('http://localhost:5000/api/bookings', payload);
      alert("બુકિંગ સફળતાપૂર્વક કન્ફર્મ થયું!");
      navigate('/my-bookings');
    } catch (error) {
      console.error("Booking Error:", error);
      alert("ક્ષમા કરશો, બુકિંગ નિષ્ફળ.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#e6fcf0]">
      
      {/* Top Header Navigation Back */}
      <div className="pt-8 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-800 font-bold text-xl hover:text-[var(--color-brand-green)] transition-colors w-fit"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
          પાછા જાઓ
        </button>
      </div>

      {/* Main Booking Body */}
      <main className="flex-grow p-6 md:p-12 max-w-6xl mx-auto w-full flex items-center justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          
          {/* Left Column: Tool Summary */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden w-full flex flex-col p-4 pb-8">
              <div className="h-[250px] w-full flex items-center justify-center rounded-2xl overflow-hidden mb-6">
                <img 
                  src={tool.image} 
                  alt={tool.name} 
                  className="w-full h-full object-cover mix-blend-multiply" 
                />
              </div>
              
              <div className="text-center">
                <h2 className="text-[2rem] font-black text-gray-900 leading-tight mb-2">
                  {tool.name}
                </h2>
                <p className="text-[1.35rem] font-extrabold text-[var(--color-brand-green)]">
                  ₹{priceNumeric} <span className="text-gray-500 font-bold text-lg">/ કલાક</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-10 flex flex-col gap-8 h-full">
              
              {/* Row 1: Date, Time and Hours */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 font-bold text-[15px]">તારીખ પસંદ કરો</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 font-bold text-[15px]">સમય (વાગ્યે)</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] text-gray-800 font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-gray-900 font-bold text-[15px]">કેટલા કલાક?</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input 
                      type="number" 
                      min="1"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 1)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] text-gray-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Address */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-900 font-bold text-[15px]">ગામ / સરનામું</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[var(--color-brand-green)] text-gray-800 font-medium"
                />
              </div>

              {/* Bill Summary */}
              <div className="bg-[#f4f4f4] rounded-xl p-6 mt-2 border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-bold text-lg">દર</span>
                  <span className="text-gray-400 font-bold text-lg">₹{priceNumeric} x {hours} કલાક</span>
                </div>
                
                <div className="border-t border-gray-300 w-full mb-4"></div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#008000] font-black text-xl">કુલ રકમ</span>
                  <span className="text-[#008000] font-black text-2xl">₹{totalAmount}</span>
                </div>
              </div>

              {/* Confirm Button */}
              <button 
                onClick={handleConfirm}
                className="w-full bg-[#008000] hover:bg-green-800 text-white font-extrabold text-2xl py-4 rounded-xl shadow-lg hover:shadow-xl transition-all mt-4"
              >
                બુકિંગ કન્ફર્મ કરો
              </button>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolBooking;
