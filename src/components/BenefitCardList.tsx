// components/BenefitCardList.tsx
import React from "react";

interface BenefitItem {
  title: string;
  desc: string;
  icon: string; // caminho da imagem SVG ou PNG
}

const BenefitCardList: React.FC = () => {
  const benefits: BenefitItem[] = [
    {
      title: "Desenvolva Autoconhecimento",
      desc: "Entenda seus gatilhos, emoções e o que realmente impacta seu bem-estar.",
      icon: "/images/lampada.svg",
    },
    {
      title: "Fortaleça sua Resiliência",
      desc: "Aprenda a lidar com os desafios da vida de forma mais equilibrada e consciente.",
      icon: "/images/escudo.svg",
    },
    {
      title: "Cuide da Sua Saúde Emocional",
      desc: "Crie um espaço dedicado ao seu desenvolvimento pessoal e cuidado mental.",
      icon: "/images/coracao.svg",
    },
    {
      title: "Reduza Estresse e Ansiedade",
      desc: "Com questionários regulares e suporte, encontre mais calma no seu dia a dia.",
      icon: "/images/raio_azul.svg",
    },
  ];

  return (
    <div className="flex flex-wrap gap-6 mt-16 max-w-6xl mx-auto">
      {benefits.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#070B1F] border border-[#0D1E45] px-8 py-9 rounded-xl text-left flex items-center gap-4 basis-full md:basis-[calc(50%-0.75rem)]"
        >
          <img src={item.icon} alt={item.title} className="w-13 h-13" />
          <div>
            <h4 className="text-white font-semibold text-[20px]">{item.title}</h4>
            <p className="text-gray-400 text-sm max-w-[500px]">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BenefitCardList;
