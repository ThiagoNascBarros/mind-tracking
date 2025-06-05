// src/pages/Home.jsx
import React from "react";
import FeatureSection from "../components/FeatureSection";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import FeatureCardList from "../components/FeatureCardList";
import BenefitCardList from "../components/BenefitCardList";

export default function Home() {
  return (
    <main className="bg-[linear-gradient(135deg,#03061B_0%,#0F1526_50%,#0F1A3D_100%)] text-white">
      <Header />
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-25 py-8 md:py-16 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="w-full md:max-w-2xl space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#0054A8] via-[#0095F0] to-[#0054A8] bg-clip-text text-transparent">
            Cuide da sua mente, transforme sua vida.
          </h1>
          <p className="text-base sm:text-lg text-[#8E8999] max-w-[90%] md:max-w-none mx-auto md:mx-0">
            A MindTracking está aqui para ajudar você a entender e melhorar sua
            saúde mental.
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="px-6 py-3 bg-[#3399FF] hover:bg-blue-700 rounded-full font-medium transition-colors duration-200">
              Comece sua jornada
            </button>
          </div>
        </div>
        <div className="w-full md:w-auto mt-8 md:mt-0 flex justify-center">
          <img
            src="../../public/images/hero.svg"
            alt="Ilustração"
            className="w-[280px] sm:w-[320px] md:w-[400px] h-auto"
          />
        </div>
      </section>

      {/* Mensagem de apoio */}
      <section className="text-center px-6 pb-25 pt-20 bg-[#0b1020]">
        <div className="w-[245px] h-[38px] mb-5 bg-white/10 rounded-lg mx-auto text-center flex items-center justify-center">
          <p className="text-center font-medium">Sua Jornada Começa Aqui</p>
        </div>
        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          Você não está sozinho(a) em sua busca por bem-estar.
        </h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-semibold">
          Muitas vezes, os desafios da vida podem parecer esmagadores. A Jornada
          Consciente oferece um caminho claro e ferramentas de apoio.
        </p>
        <FeatureSection />
      </section>

      {/* Recursos */}
      <section className="px-6 pt-20 pb-25 text-center max-w-7xl mx-auto">
        <div className="w-[170px] h-[38px] mb-5 bg-white/10 rounded-lg mx-auto text-center flex items-center justify-center">
          <p className="text-center font-medium">Nossos Recursos</p>
        </div>
        <h2 className="text-2xl md:text-4xl font-semibold text-center">
          Ferramentas Poderosas para Seu Bem-Estar Integral
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto font-semibold mt-5">
          Explore funcionalidades intuitivas projetadas para apoiar cada etapa
          da sua jornada de autoconhecimento e cuidado mental.
        </p>
        <FeatureCardList />
      </section>

      {/* Benefícios */}
      <section className="bg-[#0b1020] px-6 py-16 text-center">
        <div className="w-[170px] h-[38px] mb-7 bg-white/10 rounded-lg mx-auto text-center flex items-center justify-center">
          <p className="text-center font-medium">Seus Benefícios</p>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-5">
          Cultive uma Mente Mais Saudável e Consciente
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto font-semibold">
          Ao usar a Jornada Consciente, você desbloqueia um caminho para um
          maior bem-estar e autocompreensão.
        </p>

        <BenefitCardList />
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <div className="text-5xl text-blue-400 mb-6">🧠</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pronto(a) para Iniciar Sua Jornada Consciente?
          </h2>
          <p className="text-gray-400 mb-6">
            Dê o primeiro passo em direção a uma vida mais equilibrada e com
            mais autoconhecimento.
          </p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">
            Quero Começar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
