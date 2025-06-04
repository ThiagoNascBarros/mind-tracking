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
    <div className="flex justify-center gap-6 mt-10">
      {features.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#131927] px-7.5 rounded-xl text-left  shadow-md "
        >
          <div className="text-3xl mb-4.5 mt-8">
            {item.icon.startsWith("/") ? (
              <img src={item.icon} alt={item.title} className="w-8 h-8" />
            ) : (
              item.icon
            )}
          </div>
          <h3 className="text-[20px] font-semibold text-white">{item.title}</h3>
          <p className="text-gray-400 font-sm text-sm mt-3 mb-6 w-84">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
