import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header/Header";

interface User {
  id: number;
  nome: string;
  email: string;
  data_nascimento: string;
  questionario_inicial: boolean;
}

interface Estatisticas {
  total_questionarios: number;
  idade: number;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const userData = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');

      if (!userData || !token) {
        navigate('/sign-in');
        return;
      }

      try {
        const user = JSON.parse(userData);
        setUser(user);

        // Buscar estatísticas do usuário
        const response = await fetch(`https://mindtracking-api.onrender.com/questionario/estatisticas/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setEstatisticas(data.estatisticas);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const [showExcluirModal, setShowExcluirModal] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1526] text-white">
        <Header />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className="text-center">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!user || !estatisticas) {
    return null;
  }

  async function handleExcluirConta(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> {
    event.preventDefault();
    if (!user) return;

    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/sign-in');
      return;
    }

    try {
      const response = await fetch(`https://mindtracking-api.onrender.com/auth/delete-account`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        sessionStorage.clear();
        setShowExcluirModal(false);
        navigate('/');
      } else {
        // Optionally handle error (show message, etc)
        alert('Erro ao excluir conta. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
      alert('Erro ao excluir conta. Tente novamente.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1526] text-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Topo com nome e botões */}
        <div className="bg-transparent rounded-xl py-4 sm:py-6 lg:py-0 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">{user.nome}</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate("/redefine")}
              className="w-full cursor-pointer sm:w-auto bg-[#3399FF] hover:bg-[#2688e3] text-white px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Alterar senha
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="w-full cursor-pointer sm:w-auto bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            >
              Sair da conta
            </button>
            <button
              onClick={() => setShowExcluirModal(true)}
              className="w-full cursor-pointer sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm sm:text-base transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
            >
              Excluir conta
            </button>
          </div>
        </div>

        {/* Dados do usuário */}
        <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          <div className="border border-[#3399FF] rounded-md px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 hover:bg-[#1E2A48] transition-colors duration-200">
            <p className="text-xs sm:text-sm lg:text-base text-gray-400">Email</p>
            <p className="text-base sm:text-lg lg:text-xl mt-1 break-all">{user.email}</p>
          </div>
          <div className="border border-[#3399FF] rounded-md px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 hover:bg-[#1E2A48] transition-colors duration-200">
            <p className="text-xs sm:text-sm lg:text-base text-gray-400">Idade</p>
            <p className="text-base sm:text-lg lg:text-xl mt-1">{estatisticas.idade} anos</p>
          </div>
          <div className="border border-[#3399FF] rounded-md px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5 hover:bg-[#1E2A48] transition-colors duration-200">
            <p className="text-xs sm:text-sm lg:text-base text-gray-400">Questionários completos</p>
            <p className="text-base sm:text-lg lg:text-xl mt-1 text-green-400">{estatisticas.total_questionarios}</p>
          </div>
        </div>

        {/* Resumo semanal */}
        <div className="mt-6 sm:mt-8 lg:mt-10 border border-[#3399FF] rounded-md px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-6 text-center hover:bg-[#1E2A48] transition-colors duration-200">
          <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4">Resumo Semanal</h3>
          <p className="text-xs sm:text-sm lg:text-base text-gray-300 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
            Seu dashboard detalhado no final da semana. Continue respondendo aos
            diários para um acompanhamento preciso.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-[#3399FF] cursor-pointer hover:bg-[#2688e3] text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full text-sm sm:text-base lg:text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Ver progresso
          </button>
        </div>
      </div>

      {/* Modal de Confirmação de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 z-50 animate-fadeIn">
          <div className="bg-[#1E2A48] rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl border border-[#3399FF]/20 animate-scaleIn">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3">Sair da Conta?</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                Tem certeza que deseja sair da sua conta? Você precisará fazer login novamente para acessar o sistema.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition-all duration-200 rounded-full border border-gray-600 hover:border-gray-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 z-50 animate-fadeIn">
          <div className="bg-[#1E2A48] rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl border border-[#3399FF]/20 animate-scaleIn">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3">Sair da sua conta?</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                Tem certeza que deseja sair da sua conta?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition-all duration-200 rounded-full border border-gray-600 hover:border-gray-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal de Confirmação de Exclusão */}
      {showExcluirModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 lg:p-8 z-50 animate-fadeIn">
          <div className="bg-[#1E2A48] rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl border border-[#3399FF]/20 animate-scaleIn">
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-3 sm:mb-4 lg:mb-5 bg-red-500/10 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-2 sm:mb-3">Excluir Conta?</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-300">
                Tem certeza que deseja excluir sua conta? Esta ação é irreversível e todos os seus dados serão perdidos.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <button
                onClick={() => setShowExcluirModal(false)}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base text-gray-300 hover:text-white transition-all duration-200 rounded-full border border-gray-600 hover:border-gray-500 transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500/30"
              >
                Cancelar
              </button>
              <button
                onClick={handleExcluirConta}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 text-xs sm:text-sm lg:text-base bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}