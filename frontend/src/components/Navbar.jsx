import { Tractor } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/farmer-login' || location.pathname === '/signup';

  const logoContent = (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-[var(--color-brand-green)] flex items-center justify-center">
        <Tractor className="text-[var(--color-brand-green)]" size={32} />
      </div>
      <div className="font-bold text-xl leading-tight">
        <span className="text-[var(--color-brand-green)] font-extrabold uppercase block">ખેડૂત સાધન</span>
        <span className="text-red-500 text-sm">બુકિંગ(ભાડે)</span>
      </div>
    </div>
  );

  return (
    <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
      {/* Logo Section */}
      {isAuthPage ? (
        <Link to="/" className="cursor-pointer hover:opacity-80 transition-opacity">
          {logoContent}
        </Link>
      ) : (
        <div>{logoContent}</div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Link to="/farmer-login" className="text-[var(--color-brand-green)] font-semibold hover:text-green-800 px-4 py-2">
          લૉગિન
        </Link>
        <Link to="/signup" className="bg-[var(--color-brand-green)] text-white px-6 py-2 rounded-full font-semibold hover:bg-green-800 transition-colors">
          નોંધણી કરો
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
