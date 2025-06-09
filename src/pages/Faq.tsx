// src/pages/FaqPage.tsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import FaqItem from "../components/FaqItem";

interface Faq {
  question: string;
  answer: string;
}

const faqData: Faq[] = [
  {
    question: "O que é o MindTracking?",
    answer:
      "O MindTracking é uma plataforma de saúde mental que permite aos usuários responder questionários diários sobre seu humor e bem-estar. Nossa ferramenta ajuda você a monitorar seu estado emocional, identificar padrões e receber insights personalizados para melhorar sua saúde mental.",
  },
  {
    question: "Como funcionam os gráficos semanais?",
    answer:
      "Ao final de cada semana, o MindTracking processa suas respostas diárias e gera gráficos interativos que mostram a evolução do seu humor, níveis de estresse e outros indicadores importantes. Você pode visualizar tendências, identificar padrões e acompanhar seu progresso ao longo do tempo.",
  },
  {
    question: "Minhas respostas são privadas?",
    answer:
      "Sim! A privacidade dos seus dados é nossa prioridade. Todas as suas respostas são armazenadas de forma criptografada e seguimos rigorosos protocolos de segurança. Seus dados pessoais nunca são compartilhados com terceiros sem seu consentimento explícito.",
  },
  {
    question: "Como conversar com Mind IA?",
    answer:
      "Acesse a página Mind IA no menu e digite sua mensagem no chat. Nossa IA está sempre pronta para ouvir, oferecer dicas de bem-estar e ajudar você a refletir sobre suas emoções. A conversa é confidencial e você pode interagir a qualquer momento.",
  },
  {
    question: "O que são os lembretes diários e como funcionam?",
    answer:
      "Os lembretes diários são notificações personalizáveis que você pode ativar para lembrar de preencher seus questionários. Você pode escolher o melhor horário para receber os lembretes e ajustar a frequência conforme sua preferência, ajudando a manter uma rotina consistente de monitoramento.",
  },
  {
    question: "O MindTracking substitui a ajuda de um profissional?",
    answer:
      "Não. O MindTracking é uma ferramenta de apoio para autoconhecimento e monitoramento emocional, mas não substitui o acompanhamento profissional. Recomendamos sempre consultar um especialista em saúde mental para diagnóstico e tratamento adequados.",
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F23] text-white">
      <Header />
      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8 md:mb-12 lg:mb-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white">
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre o
              MindTracking
            </p>
          </div>

          {/* Lista de FAQs */}
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {faqData.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => toggleOpen(index)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FaqPage;
