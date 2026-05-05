import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section 
      className="relative h-[500px] flex items-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/farmer_images/back_img.jpg")' }}
    >
      {/* Dark Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 px-10 md:px-20 max-w-4xl text-white">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
          ખેડૂત સાધન ભાડે
        </h1>
        <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
          તમારા ગામ માટે સરળ સાધન બુકિંગ. આધુનિક ખેતી, સમૃદ્ધ ખેડૂત.
        </p>
        
        <div className="flex gap-4">
          <Link to="/farmer-login" className="bg-[var(--color-brand-yellow)] text-green-900 border-2 border-[var(--color-brand-yellow)] px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition-colors inline-block text-center">
            ખેડૂત લૉગિન
          </Link>
          <Link to="/admin-login" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors inline-block text-center">
            એડમિન લૉગિન
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
