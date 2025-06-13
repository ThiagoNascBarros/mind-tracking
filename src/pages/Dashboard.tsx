import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Questionario {
  data: string;
  nota_convertida: number;
  tipo?: string;
}

function Dashboard() {
  const [score, setScore] = useState<string>("Carregando pontuação...");
  const [tip, setTip] = useState<string>("Carregando dica...");
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [{
      label: 'Avaliação de Humor Diária',
      data: [] as number[],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.4,
    }]
  });

  useEffect(() => {
    const carregarPontuacao = async () => {
      const token = sessionStorage.getItem("token");
      const user = JSON.parse(sessionStorage.getItem("user") || "null");

      if (!user || !token) {
        setScore("Faça login para ver sua pontuação");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/questionario/pontuacao/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

        const data = await response.json();
        if (data.success) {
          setScore(`Sua nota: ${data.nota} / 10 - Nível: ${data.nivel}`);
        } else {
          console.error("Erro ao buscar pontuação:", data.message);
          setScore("Erro ao carregar pontuação");
        }

      } catch (error) {
        console.error("Erro ao carregar pontuação:", error);
        setScore("Responda questionarios para gerar uma nota");
      }
    };

    const gerarDica = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/dica', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar a dica: ' + response.statusText);
        }

        const data = await response.json();
        setTip(data.dica);
      } catch (error) {
        console.error('Erro ao gerar dica:', error);
        setTip('Converse com Athena para gerar dicas.');
      }
    };

    const carregarHistoricoQuestionarios = async () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "null");
      const token = sessionStorage.getItem("token");

      if (!user || !token) {
        console.error('Usuário não encontrado no sessionStorage.');
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/questionario/historico/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }

        const response = await res.json();

        if (!response.success) {
          throw new Error(response.message || 'Erro ao carregar questionários');
        }

        const questionarios = response.historico as Questionario[];
        if (!questionarios || questionarios.length === 0) {
          return;
        }

        // Ordenar questionários por data
        const questionariosOrdenados = questionarios.sort((a: Questionario, b: Questionario) => 
          new Date(a.data).getTime() - new Date(b.data).getTime()
        );

        // Pegar os últimos 7 questionários
        const ultimosQuestionarios = questionariosOrdenados.slice(-7);

        // Preparar dados para o gráfico
        const labels = ultimosQuestionarios.map((q: Questionario) => 
          new Date(q.data).toLocaleDateString('pt-BR', { weekday: 'short' })
        );
        const dados = ultimosQuestionarios.map((q: Questionario) => q.nota_convertida);

        setChartData({
          labels: labels,
          datasets: [{
            label: 'Avaliação de Humor Diária',
            data: dados,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            tension: 0.4,
          }]
        });

      } catch (err) {
        console.error('Erro ao carregar questionários:', err);
      }
    };

    carregarPontuacao();
    gerarDica();
    carregarHistoricoQuestionarios();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Gráfico de Bem-estar',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          color: '#8E8999', // Match text color from image
        },
        grid: {
          color: '#ffffff20', // Match grid color from image
        },
      },
      x: {
        ticks: {
          color: '#8E8999', // Match text color from image
        },
        grid: {
          color: '#ffffff20', // Match grid color from image
        },
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] pb-16">
        <section className='flex flex-col px-[1em] md:px-[4em] lg:px-[12em]'>
          <h1 className='text-white text-2xl md:text-3xl lg:text-4xl font-bold mt-10 md:mt-14 text-left md:text-left'>Desempenho dos últimos questionários</h1>
          <div className='flex flex-col w-full sm:h-[36em] md:h-[28em] lg:h-[34em] gap-4 mt-5 bg-[#161D2D] border-2 border-[#ffffff20] rounded-lg p-4 md:px-6 lg:px-8 md:py-5'>
            <div className='flex flex-col gap-2'>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-2xl md:text-2xl lg:text-3xl font-semibold">Gráfico de Bem-estar</h2>
              </div>
              <p className="text-[#8E8999] text-sm">Suas avaliações diárias de humor.</p>
            </div>

            {/* Chart area */}
            <div className="flex-grow">
              <Line data={chartData} options={options} />
            </div>
          </div>
          <div className="p-4 md:p-6 lg:p-12 bg-[#161D2D] border-2 border-[#ffffff20] rounded-lg mt-5">
            <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold text-white mb-2">Principais Observações</h1>
            <p className="text-sm md:text-sm lg:text-base text-[#E5E7EB] mb-8">Destaques e conselhos práticos baseados nos seus dados.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Card 1: Flutuações de Humor */}
              <div className="bg-[#1A202C] p-4 sm:p-5 md:p-6 rounded-md flex items-start space-x-3 md:space-x-4 border border-[#2D3748] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="text-blue-500 text-2xl flex-shrink-0 mt-1">
                  {/* Ícone Check Azul */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1">Dica da Athena</h3>
                  <p className="text-sm text-[#E5E7EB] leading-relaxed">Recomendações personalizadas da Athena, geradas a partir das suas interações.</p>
                  <p className="text-lg font-medium text-blue-400 mt-2">{tip}</p>
                </div>
              </div>

              {/* Card 2: Engajamento em Atividades */}
              <div className="bg-[#1A202C] p-4 sm:p-5 md:p-6 rounded-md flex items-start space-x-3 md:space-x-4 border border-[#2D3748] shadow-lg transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/20">
                <div className="text-green-500 text-2xl flex-shrink-0 mt-1">
                   {/* Ícone Check Verde */}
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 md:h-8 md:w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-white mb-1">Pontuação dos Relatórios</h3>
                  <p className="text-sm text-[#E5E7EB] leading-relaxed">Pontuação calculada a partir das suas respostas nos questionários anteriores, refletindo seu progresso e padrões de comportamento ao longo do tempo.</p>
                  <p className="text-lg font-medium text-blue-400 mt-2">{score}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;