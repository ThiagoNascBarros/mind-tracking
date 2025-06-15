import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Pergunta {
  id: number;
  texto: string;
  alternativas: {
    id: number;
    texto: string;
  }[];
}

interface QuestionarioProps {
  mostrarSaudacao?: boolean;
}

const Questionario: React.FC<QuestionarioProps> = ({ mostrarSaudacao = false }) => {
  const navigate = useNavigate();
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<number, number>>({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarPerguntas();
  }, []);

  const carregarPerguntas = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");

      if (!token || !user) {
        navigate('/login');
        return;
      }

      const isQuestionarioInicial = !user.questionario_inicial;
      const url = `https://mindtrack-api-1.onrender.com/questionario/perguntas${isQuestionarioInicial ? '?questionario_inicial=true' : ''}`;
      
      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Erro desconhecido no servidor");

      setPerguntas(data.perguntas);
      setError(null);
    } catch (error) {
      console.error("Erro detalhado:", error);
      setError(error instanceof Error ? error.message : "Erro ao carregar perguntas");
    } finally {
      setLoading(false);
    }
  };

  const handleVoltar = () => {
    if (indiceAtual === 0) {
      setShowModal(true);
    } else {
      setIndiceAtual(prev => prev - 1);
    }
  };

  const handleConfirmarSaida = () => {
    navigate('/questionarios');
  };

  const handleResposta = (perguntaId: number, alternativaId: number) => {
    setRespostas(prev => ({
      ...prev,
      [perguntaId]: alternativaId
    }));
  };

  const handleEnviar = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");

      const respostasArray = perguntas.map(pergunta => ({
        pergunta_id: pergunta.id,
        alternativa_id: respostas[pergunta.id] || null
      }));

      if (respostasArray.some(r => r.alternativa_id === null)) {
        alert("Por favor, responda todas as perguntas!");
        return;
      }

      const response = await fetch("https://mindtrack-api-1.onrender.com/questionario/responder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ usuario_id: user.id, respostas: respostasArray })
      });

      const data = await response.json();
      if (data.success) {
        user.questionario_inicial = true;
        sessionStorage.setItem("user", JSON.stringify(user));

        // Buscar pontuação
        const pontuacaoRes = await fetch(`https://mindtrack-api-1.onrender.com/questionario/pontuacao/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const pontuacaoData = await pontuacaoRes.json();
        if (pontuacaoData.success) {
          console.log("Pontuação:", pontuacaoData.pontuacao_total);
          console.log("Nível:", pontuacaoData.nivel);
        }

        navigate('/dashboard');
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar respostas");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-[#0A0F23] text-white px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg">Carregando perguntas...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-[#0A0F23] text-white px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="error">
              <p className="text-lg mb-4">Erro ao carregar perguntas</p>
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={carregarPerguntas}
                className="bg-[#3399FF] hover:bg-[#2980e9] px-6 py-2 rounded-full"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const perguntaAtual = perguntas[indiceAtual];
  const progresso = ((indiceAtual + 1) / perguntas.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-[#0A0F23] text-white px-4 sm:px-6 md:px-12 lg:px-24 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Barra de progresso */}
          <div className="mb-6 md:mb-8">
            <p className="text-sm md:text-base text-white mb-2">Progresso</p>
            <div className="w-full bg-[#1E2A48] h-1.5 md:h-2 rounded-md">
              <div 
                className="bg-blue-500 h-1.5 md:h-2 rounded-md transition-all duration-300" 
                style={{ width: `${progresso}%` }} 
              />
            </div>
            <div className="text-xs md:text-sm text-right mt-1 text-gray-400">
              {Math.round(progresso)}%
            </div>
          </div>

          {/* Pergunta */}
          <div className="space-y-4 md:space-y-6">
            {mostrarSaudacao && indiceAtual === 0 && (
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-center md:text-left">
                Bem-vinda! Vamos começar.
              </h2>
            )}

            <p className="text-sm md:text-base lg:text-lg text-gray-300 text-center md:text-left">
              {perguntaAtual?.texto}
            </p>

            <form className="space-y-3 md:space-y-4 mt-6 md:mt-8">
              {perguntaAtual?.alternativas.map((alternativa) => (
                <label
                  key={alternativa.id}
                  htmlFor={`radio-${alternativa.id}`}
                  className="flex items-center gap-3 p-3 md:p-4 rounded-lg hover:bg-[#1E2A48] transition-colors duration-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`radio-${alternativa.id}`}
                    name={`pergunta_${perguntaAtual.id}`}
                    value={alternativa.id}
                    checked={respostas[perguntaAtual.id] === alternativa.id}
                    onChange={() => handleResposta(perguntaAtual.id, alternativa.id)}
                    className="form-radio text-blue-500 h-4 w-4 md:h-5 md:w-5 bg-transparent border-gray-600"
                  />
                  <span className="text-sm md:text-base text-gray-300">{alternativa.texto}</span>
                </label>
              ))}
            </form>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 md:mt-12">
              <button 
                onClick={handleVoltar}
                className="w-full sm:w-auto bg-transparent text-white border-2 border-[#3399FF] hover:border-[#2980e9] hover:bg-[#1a2639] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base"
              >
                Voltar
              </button>
              {indiceAtual < perguntas.length - 1 ? (
                <button
                  className="w-full sm:w-auto bg-[#3399FF] hover:bg-[#2980e9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base text-white disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-none"
                  disabled={!respostas[perguntaAtual.id]}
                  onClick={() => setIndiceAtual(prev => prev + 1)}
                >
                  Próxima pergunta
                </button>
              ) : (
                <button
                  className="w-full sm:w-auto bg-[#3399FF] hover:bg-[#2980e9] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base text-white disabled:opacity-50 disabled:hover:transform-none disabled:hover:shadow-none"
                  disabled={!respostas[perguntaAtual.id]}
                  onClick={handleEnviar}
                >
                  Enviar Respostas
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#1E2A48] rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#3399FF]/20 animate-scaleIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">Sair do Questionário?</h3>
              <p className="text-gray-300 text-sm md:text-base">
                Tem certeza que deseja sair? Seu progresso não será salvo.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-6 py-2.5 text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-200 rounded-full border border-gray-600 hover:border-gray-500"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarSaida}
                className="w-full sm:w-auto px-6 py-2.5 text-sm md:text-base bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionario;
