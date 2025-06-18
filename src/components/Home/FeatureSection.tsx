import React from "react";

interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

const FeatureSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      title: "Sentindo-se Sobrecarregado(a)?",
      desc: "Navegar pelas emoções e pelo estresse diário pode ser exaustivo. Encontre clareza e estratégias para lidar melhor.",
      icon: "/images/raio.svg",
    },
    {
      title: "Dificuldade em Entender Padrões?",
      desc: "Descubra como seu humor, sono e atividades se conectam. A autoconsciência é o primeiro passo para a mudança.",
      icon: "/images/livro.svg",
    },
    {
      title: "Buscando Apoio e Conexão?",
      desc: "Um espaço seguro, acolhedor e livre de julgamentos para se expressar com nosso Companheiro IA, que está sempre pronto para ouvir, apoiar e ajudar no que for preciso.",
      icon: "/images/pessoas.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#131927] px-5 sm:px-6 md:px-7.5 py-5 sm:py-6 md:py-8 rounded-xl text-left shadow-md w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20"
          >
            <div className="text-3xl mb-3 sm:mb-4 md:mb-4.5">
              {item.icon.startsWith("/") ? (
                <img src={item.icon} alt={item.title} className="w-7 h-7 sm:w-8 sm:h-8" />
              ) : (
                item.icon
              )}
            </div>
            <h3 className="text-base sm:text-lg md:text-[20px] font-semibold text-white leading-tight">{item.title}</h3>
            <p className="text-gray-400 text-sm sm:text-base mt-2 sm:mt-3 mb-3 sm:mb-4 md:mb-6 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
