import React from 'react';
import { NavLink } from 'react-router-dom';

const features = [
  {
    title: 'Check-ins Diários Simplificados',
    desc: 'Registre seu humor, sono e níveis de estresse em segundos. Um hábito pequeno com  impacto.',
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
    <div className="bg-[#161D2D] px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-10 md:py-12 rounded-xl shadow-md text-center transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
      <div className="flex justify-center mb-6 sm:mb-7 md:mb-8">
        {icon.startsWith('/') ? (
          <img src={icon} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 md:w-13.5 md:h-13.5" />
        ) : (
          <span className="text-3xl sm:text-4xl text-blue-400">{icon}</span>
        )}
      </div>
      <h3 className="text-white text-lg sm:text-xl md:text-[24px] font-semibold mb-3 sm:mb-4 leading-tight">{title}</h3>
      <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-7 md:mb-8 leading-relaxed">{desc}</p>
      <NavLink to="/faq">
      <button className="mb-8 sm:mb-10 md:mb-14 px-3 sm:px-4 py-2 text-sm sm:text-base border border-blue-500 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition cursor-pointer">
        Saiba Mais →
      </button>
      </NavLink>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-5.5 mt-8 sm:mt-10 md:mt-12.5">
      {features.map((item, idx) => (
        <div key={idx} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)]">
          <FeatureCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default FeatureCardList;
