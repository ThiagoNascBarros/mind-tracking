import React from 'react';

const features = [
  {
    title: 'Check-ins Diários Simplificados',
    desc: 'Registre seu humor, sono e níveis de estresse em segundos. Um hábito pequeno com grande impacto.',
    icon: '/images/questionario.svg',
  },
  {
    title: 'Insights Semanais Inteligentes',
    desc: 'Visualize padrões e tendências do seu bem-estar com gráficos claros, dinâmicos e resumidos.',
    icon: '/images/grafico.svg',
  },
  {
    title: 'Companheiro IA Empático',
    desc: 'Converse com uma IA de apoio, projetada para ouvir e oferecer conforto, a qualquer hora do dia.',
    icon: '/images/robozinho.svg',
  },
];

const FeatureCardList: React.FC = () => {
  const FeatureCard = ({ title, desc, icon }: { title: string; desc: string; icon: string }) => (
    <div className="bg-[#161D2D] px-16 rounded-xl shadow-md text-center transition transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
      <div className="flex justify-center mb-8 mt-15">
        {icon.startsWith('/') ? (
          <img src={icon} alt={title} className="w-13.5 h-13.5" />
        ) : (
          <span className="text-4xl text-blue-400">{icon}</span>
        )}
      </div>
      <h3 className="text-white text-[24px] font-semibold mb-4">{title}</h3>
      <p className="text-gray-400 text-sm mb-8">{desc}</p>
      <button className="mb-14 px-4 py-2 text-sm border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
        Saiba Mais →
      </button>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-5.5 mt-12.5">
      {features.map((item, idx) => (
        <FeatureCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default FeatureCardList;
