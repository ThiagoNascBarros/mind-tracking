// src/pages/FaqPage.tsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

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
    question: "Como funcionam os questionários?",
    answer:
      "Nossos questionários são projetados para serem rápidos e intuitivos. Você responde perguntas sobre seu humor, sono, níveis de estresse e outras métricas importantes. As respostas são registradas diariamente, permitindo um acompanhamento consistente do seu bem-estar.",
  },
  {
    question: "Como funciona o Mind IA?",
    answer:
      "O Mind IA é um assistente virtual que utiliza inteligência artificial para oferecer suporte emocional e dicas personalizadas. Ele analisa seus padrões de resposta e oferece insights relevantes para ajudar no seu desenvolvimento pessoal.",
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
  const location = useLocation();

  useEffect(() => {
    // Verifica se há um activeTab no estado da navegação
    const activeTab = location.state?.activeTab;
    if (activeTab) {
      // Encontra o índice da FAQ correspondente ao activeTab
      const index = faqData.findIndex(faq => 
        faq.question.toLowerCase().includes(activeTab.replace('/', '').toLowerCase())
      );
      if (index !== -1) {
        setOpenIndex(index);
      }
    }
  }, [location]);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0A0F23] to-[#1a1f3d] text-white">
      <div className="z-50">
        <Header isFaqPage={true} />
      </div>
      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Cabeçalho */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 md:mb-16 lg:mb-20"
          >
            <h1 className="text-2xl sm:text-2xl md:text-5xl font-bold mb-4 text-white">
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre o
              MindTracking
            </p>
          </motion.div>

          {/* Lista de FAQs */}
          <div className="space-y-5">
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 transition-all ${
                  openIndex === index ? 'scale-[1.02] shadow-lg shadow-white/10 border-white/20' : ''
                }`}
                whileHover={{ scale: openIndex === index ? 1.02 : 1.01 }}
              >
                <motion.div
                  onClick={() => toggleOpen(index)}
                  className="p-6 cursor-pointer flex justify-between items-center"
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-left md:text-lg w-56 md:w-auto font-medium md:font-semibold text-white transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <motion.div 
                    className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial="collapsed"
                      animate="expanded"
                      exit="collapsed"
                      variants={{
                        expanded: {
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: {
                              duration: 0.4,
                              ease: [0.04, 0.62, 0.23, 0.98]
                            },
                            opacity: {
                              duration: 0.25,
                              delay: 0.15
                            }
                          }
                        },
                        collapsed: {
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: {
                              duration: 0.3,
                              ease: [0.04, 0.62, 0.23, 0.98]
                            },
                            opacity: {
                              duration: 0.2
                            }
                          }
                        }
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        variants={{
                          expanded: {
                            y: 0,
                            opacity: 1,
                            transition: {
                              y: {
                                duration: 0.3,
                                ease: [0.04, 0.62, 0.23, 0.98]
                              },
                              opacity: {
                                duration: 0.25,
                                delay: 0.15
                              }
                            }
                          },
                          collapsed: {
                            y: -20,
                            opacity: 0,
                            transition: {
                              y: {
                                duration: 0.2,
                                ease: [0.04, 0.62, 0.23, 0.98]
                              },
                              opacity: {
                                duration: 0.15
                              }
                            }
                          }
                        }}
                        className="px-6 pb-6 text-gray-300"
                      >
                        <p className="leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer isFaqPage={true} />
    </div>
  );
};

export default FaqPage;
