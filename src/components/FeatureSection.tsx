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
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-10">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#131927] px-6 md:px-7.5 py-6 md:py-8 rounded-xl text-left shadow-md w-full md:flex-1"
          >
            <div className="text-3xl mb-4 md:mb-4.5">
              {item.icon.startsWith("/") ? (
                <img src={item.icon} alt={item.title} className="w-8 h-8" />
              ) : (
                item.icon
              )}
            </div>
            <h3 className="text-lg md:text-[20px] font-semibold text-white">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-3 mb-4 md:mb-6 max-w-[300px] md:max-w-none">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
