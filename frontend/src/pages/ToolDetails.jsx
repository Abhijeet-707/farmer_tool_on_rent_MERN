import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { ArrowLeft, MapPin, CheckCircle, Info, CalendarClock } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const ToolDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tool = location.state?.tool || {
    name: "John Deere 5310",
    image: "https://images.unsplash.com/photo-1592982537447-6f23f8b54964?auto=format&fit=crop&q=80&w=800",
    location: "રાજકોટ",
    priceHour: "₹800",
    priceDay: "₹6000",
    description: "55 HP, Power Steering, High torque suitable for all heavy farm applications."
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

      {/* Main Details Body */}
      <main className="flex-grow p-6 md:p-12 max-w-7xl mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image and Book Button */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-[300px] md:h-[450px] flex items-center justify-center p-4">
              <img 
                src={tool.image} 
                alt={tool.name} 
                className="w-full h-full object-contain mix-blend-multiply" 
              />
            </div>

            <Link to="/tool-booking" state={{ tool }} className="w-full bg-[#008000] hover:bg-green-800 text-white font-extrabold text-2xl py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-3">
              <CalendarClock size={28} />
              બુકિંગ ચાલુ કરો
            </Link>
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-6 flex flex-col">
            
            {/* Badges */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-200 text-green-900 font-bold px-4 py-1.5 rounded-full text-sm">
                ઉપલબ્ધ
              </span>
              <div className="flex items-center text-gray-500">
                <MapPin size={20} className="text-red-500 mr-1" />
                <span className="font-semibold text-lg">{tool.location}</span>
              </div>
            </div>

            {/* Title & Desc */}
            <h1 className="text-4xl md:text-[2.75rem] font-black text-gray-900 leading-tight mb-4 tracking-tight">
              {tool.name}
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl font-medium mb-8 leading-snug">
              {tool.description || `${tool.name} is well maintained and ready for immediate booking to support your farming needs.`}
            </p>

            {/* Rent Rate Card */}
            <div className="bg-[#a5f3bc] rounded-[1.5rem] p-6 md:p-8 mb-10 shadow-[0_4px_15px_-3px_rgba(34,197,94,0.3)]">
              <h3 className="text-2xl font-black text-green-900 mb-6 drop-shadow-sm">ભાડા દર</h3>
              
              <div className="flex justify-between items-center border-b border-green-400/50 pb-4 mb-4">
                <span className="text-green-800 text-xl font-medium">પ્રતિ કલાક</span>
                <span className="text-green-900 text-2xl font-black">{tool.priceHour}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-800 text-xl font-medium">પ્રતિ દિવસ (8 કલાક)</span>
                <span className="text-green-900 text-2xl font-black">{tool.priceDay}</span>
              </div>
            </div>

            {/* Features List */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Info size={26} className="text-blue-500" />
                <h3 className="text-2xl font-black text-gray-900">વિશેષતા</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0" size={24} />
                  <span className="text-gray-500 font-semibold text-lg">સારી સ્થિતિમાં</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0" size={24} />
                  <span className="text-gray-500 font-semibold text-lg">અનુભવી ડ્રાઇવર ઉપલબ્ધ (વધારાના ખર્ચે)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0" size={24} />
                  <span className="text-gray-500 font-semibold text-lg">ડીઝલ ખેડૂતનું રહેશે</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToolDetails;
