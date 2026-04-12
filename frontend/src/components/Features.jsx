import { Tractor, CalendarCheck, ShieldCheck } from 'lucide-react';

const Features = () => {
  const cards = [
    {
      icon: <Tractor size={48} className="text-gray-800" />,
      title: "આધુનિક સાધનો",
      description: "શ્રેષ્ઠ ગુણવત્તાના ટ્રેક્ટર અને ઓજારો વાજબી ભાવે ઉપલબ્ધ."
    },
    {
      icon: <CalendarCheck size={48} className="text-green-600" />,
      title: "સરળ બુકિંગ",
      description: "તમારા મોબાઈલથી ગમે ત્યારે અને ગમે ત્યાંથી બુકિંગ કરો."
    },
    {
      icon: <ShieldCheck size={48} className="text-blue-800" />,
      title: "વિશ્વાસપાત્ર સેવા",
      description: "ચકાસાયેલ સાધનો અને પારદર્શક વ્યવહાર."
    }
  ];

  return (
    <section className="bg-[var(--color-brand-light)] py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-8 text-center shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="flex justify-center mb-6">
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{card.title}</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
