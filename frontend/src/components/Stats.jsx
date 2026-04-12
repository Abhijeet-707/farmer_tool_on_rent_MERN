const Stats = () => {
  const statItems = [
    { number: "500+", label: "ખેડૂત જોડાયેલ" },
    { number: "100+", label: "સાધનો ઉપલબ્ધ" },
    { number: "50+", label: "ગામ આવરી લીધા" },
    { number: "24/7", label: "સહાયતા" }
  ];

  return (
    <>
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-center gap-8">
          {statItems.map((stat, idx) => (
            <div key={idx} className="flex-1 min-w-[200px]">
              <h2 className="text-5xl font-bold text-[var(--color-brand-green)] mb-2">
                {stat.number}
              </h2>
              <p className="text-gray-600 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Spacer to match the light green block above the footer in the design */}
      <div className="h-32 bg-[var(--color-brand-light)] w-full block"></div>
    </>
  );
};

export default Stats;
